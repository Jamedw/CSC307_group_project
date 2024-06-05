import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { 
  findUserByName,
  addUser } from "./services/user-service.js";  
import User from "./models/users.js";
import Community from "./models/community.js";
import { findCommunityById } from "./services/community-service.js";

//we neeed to be change this so its not stored in memory be rather in the database
//note that the token is not store on the server but only returned to the client 
const creds = [];

export async function registerUser(req, res) {
    const {username, password} = req.body;
    console.log(username, password);
    if (!(username) || !(password)) {
      res.status(400).send("Bad request: Invalid input data.");
    } else {
      const found = (await findUserByName(username));
      if(found.length){
        res.status(409).send("Username already taken");
      } 
      else{
        bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hashedPassword) => {
          generateAccessToken(username).then(async (token) => {
            console.log("Token:", token);
            let newUser = await addUser({username: username,
                              password: hashedPassword});
            console.log(newUser);
            res.status(201).send({user: newUser,
                                  communities: [],
                                token: token});
          });
        });
      }
    }  
  }

 function generateAccessToken(username) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { username: username },
        process.env.TOKEN_SECRET,
        { expiresIn: "1d" },
        (error, token) => {
          if (error) {
            reject(error);
          } else {
            resolve(token);
          }
        }
      );
    });
  }

  export function authenticateUser(req, res, next) {
    const authHeader = req.headers["authorization"];
    //Getting the 2nd part of the auth header (the token)
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      console.log("No token received");
      res.status(401).end();
    } else {
      jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        (error, decoded) => {
          if (decoded) {
            next();
          } else {
            console.log("JWT error:", error);
            res.status(401).end();
          }
        }
      );
    }
  }


  export async function loginUser(req, res) {
    const{username, password} = req.body; // from form
    const retrievedUser = await findUserByName(username);
    if (!(retrievedUser.length)) {
      // invalid username
      res.status(401).send("Unauthorized, invalid username");
    } else {
      bcrypt
        .compare(password, retrievedUser[0].password)
        .then((matched) => {
          if (matched) {
            generateAccessToken(username).then(async (token) => {
              let userData = retrievedUser[0];
              console.log(userData);
              let commArr = [];
              for(let i = 0; i < userData.communityIds.length; i++){
                commArr.push(await findCommunityById(userData.communityIds[i]));
              }
              res.status(200).send({user: userData,
                                    communities: commArr,
                                    token: token});
            });
          } else {
            // invalid password
            res.status(401).send("Unauthorized, invalid password");
          }
        })
        .catch(() => {
          res.status(401).send("Unauthorized, ?");
        });
    }
  }


