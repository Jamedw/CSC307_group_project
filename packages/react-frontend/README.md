Frontend Structure

src
├── App.css
├── App.jsx
├── assets
│   ├── calpolylogo.png
│   └── react.svg
├── index.css
├── main.jsx
├── pages
│   ├── Com_Home_post_pages
│   │   ├── CommunityPage
│   │   │   ├── CommunityPosts.jsx
│   │   │   └── Newpostpopup.jsx
│   │   ├── components
│   │   │   ├── Createcommunitypopup.jsx
│   │   │   ├── Navbar.css
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.css
│   │   │   └── Sidebar.jsx
│   │   ├── Home.css
│   │   ├── Home.jsx
│   │   ├── LandingPage
│   │   │   ├── Post.css
│   │   │   └── Posts.jsx
│   │   ├── NotFound.jsx
│   │   └── PostPage
│   │   ├── Commentpopup.jsx
│   │   ├── Comments.css
│   │   └── Comments.jsx
│   ├── images
│   │   └── calpoly.png
│   ├── Login_page
│   │   ├── Login.css
│   │   └── Login.jsx
│   └── Signup_page
│   ├── Signup.css
│   └── Signup.jsx
└── README.md

main.jsx:
main.jsx loads the component that App.jsx returns

app.jsx:
app.jsx contains a usestate for user, token, and usercommunitys
depending on the url at the momment app.jsx either routes a user
to the login, signup, Not found or home page

#Pages

LoginPage:
The LoginPage can be access from the home page by clicking on the login button if the user isn't logged in
on the Login page the user can either try to login, if the login is successful the user will be routed to the home page.
if the log in was unsuccessful an alert will appear
from the login page the user can access the signup page
A login function is passed to the LoginPage by app.jsx to handle a login

SignupPage:
the signup page allows the user to create a new account if the username is not taken then the user will be redirected to
the home page with a valid token. If the username is taken an alert will appear telling the user that the username is taken.
the user can also access the home page by clicking on the calpoly icon in the middle of the screen
A signup function is passed to the SignupPage by app.jsx to handle a signup

Home.jsx:
The Home.jsx component allways contains a navbar component and a sidebar component which is why they are in the commponets directory.

Sidebar.jsx:
If the user is logged in and the sidebar is passed a list of user communities it will populate with the user's 
communities and when clicked it will route the user to the community page of the clicked community, and it will also have 
a create community button at the bottom so that a user can create a new community. 
If the user is not logged in the sidebar will be populated with a log in button that routes the user to the login page

Navbar.jsx
when the user is logged in the navbar will contain a logout button that resets the user, token and user communities then routes the user
to the home page.
when the user is not logged in the navbar will contain a button that routes the user to the LoginPage
the navbar also contains a searchbar that allows the user to search by communities on the landing page, search for post on the 
community page and will do nothing on a post page
The navbar also contains a calpoly icon that routes the user to the Landing page when clicked

Posts.jsx
handles the landing page and is given a list of communities that contain an array of post titles.
for each post in a community it will generate a component that allows the user to route to a post if 
the title of the post is clicked and will link to the community page if the community is clicked

communitypost.jsx:
this react component takes as input a community and a array of communty post
it generates a header that allows the user to follow/unfollow the community if logged in.
If the user is logged in the user can also create a new post in the community
if the user is not logged in both buttons will route the user to the login page
the rest of the page contains a list of post which is the same as what happens in Post.jsx

Comment.jsx:
when a user clicks on a post title this component will be loaded in the home page.
this component takes a list of comments objects and a post object
the post object is used to create the header that contains the post title and the post content
On this header there is a + button that generates a popup so that a user can create new comment on the post
underneth the post header comment components will be generated