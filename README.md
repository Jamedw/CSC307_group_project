# CSC307_group_project

The Reddit But Better app is an a web application that is made for reddit users  
and fourm users that want a fourm focused on Cal Poly students. This app will  
be an open discussion platfrom that will enhance the daily lives of cal poly  
students. The app will centralize information about cal poly and the community  
while also removing any data collection and microtransactions.

In this project we have implemented a way for a person to navigate as a guest  
or a signed in user. If the user is logged in we will show their communities on  
the side bar. The project allows for you to look at a community page and a post page. We also have authentication for login and sign up. All write requests to  
the backend will require authentication and the only read request that requires  
authentication is when you want to access a users information. Otherwise all other  
read requests will not require authentication because our page also need to be  
accessible to any guest users.

mongodb mongoose moongoose acorn acorn-jsx ajv ansi-regex ansi-styles argparse balanced-match brace-expansion callsites chalk color-convert color-name concat-map cross-spawn debug deep-is escape-string-regexp eslint-scope eslint-visitor-keys espree esquery esrecurse estraverse esutils fast-deep-equal fast-json-stable-stringify fast-levenshtein fastq file-entry-cache find-up flat-cache flatted glob-parent has-flag ignore import-fresh imurmurhash is-extglob is-glob is-path-inside isexe js-yaml json-buffer json-schema-traverse json-stable-stringify-without-jsonify keyv levn locate-path lodash.merge minimatch ms natural-compare optionator p-limit p-locate parent-module path-exists path-key prelude-ls punycode queue-microtask react-router-dom resolve-from reusify run-parallel shebang-command shebang-regex strip-ansi strip-json-comments supports-color text-table type-check uri-js which word-wrap yocto-queue node  


# Development Enviornment
If a future contribute wishes to continue this project there are a few things
that must be done to setup the environment.  

clone the repo and run the command `npm install` in the root folder. Next  
you will need to make a `.env` file in the backend `/packages/express-backend` folder  
with a `MONGODB_URI` variable and a `TOKEN_SECRET` variable. The `MONGODB_URI`  
variable should contain the connection string to the mongoDB database and the  
`TOKEN_SECRET` is a string that is used to create the tokens for authentication.  
This string should only be shared with the servers that handle authentication  
requests. Note that the `backend.js` file in the `express-backend` directory  
contains a `process.env.PORT` variable but that you do not need to include  
this in your `.env` file. This enviornment varaible is only there for deployment  
purposes. To run the backend locally run the command `npm run dev` in the  
`express-backend` directory. To run the frontend, run the command `npm run dev`  
in the `/packages/react-frontend` directory.

# Links

Wiki Link to UML diagram and Test Coverage Information: https://github.com/Jamedw/CSC307_group_project/wiki

Figma link to UI prototype: https://www.figma.com/proto/Z8t4xm6Yn80Asi3uJjNF8v/wire-frame?t=EGso6PAPnt00oWIe-1

Link to video: https://youtu.be/NuTeDRIxlgs
