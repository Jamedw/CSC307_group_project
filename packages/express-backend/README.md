# File Structure
Add the `.env` file to this directory as mentioned
in the root directory READ.ME file if you want to run the backend. 
Any schemas that are made should be added to the `/models` directory 
and any service calls to the schemas made in `/modles` should be added to 
the `/services` directory. All of the backend API endpoints are contained in the `backend.js` file. Note that there is a folder to test the backend. 
However, the up-to-date version of the testing is only available in the `testing_backend` branch. If you want to run the tests simply switch to that 
branch and change your directory to the `/testBackend` directory and run the 
command `npm test`. Furthermore, you will need to add a copy of the `.env` file to the `testing-backend` direcotry.

The only coding standard for the backend is to indent and nested statements, and to
use camelCase for naming variables.

Once you have done `npm install` in the root directory and you have added a `.env` file with the appropriate enviornment variables, you can do `npm run dev` to run
the backend. Any changes to the files when the command has been ran will automatically restart the backend for you.


# Authentication
Any time we have to write to the database or query a user's information. We should avoid adding unecessary authentication to read requests because we need guests to be able to intereact with the website.