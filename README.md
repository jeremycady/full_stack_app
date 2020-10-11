# Full-Stack Course Application

This application allows users to sign up and create available courses for others. 

The REST API portion of the application is served on Node.js using Express, Sequelize ORM, and sqlite. It handles GET, POSTS, PUT, and DELETE and returns a proper response. If data fails validation protocols, errors are returned.

React was used to design and create the user experience. Depending on the routes taken in the application, it fetches the necessary data from the API and renders it to the user. Private routes are available only to user who have signed in and only the owner of a course may update or delete that course.

State is controlled entirely using React Hooks.

## To use the application:

1. download the files from Github
2. Open your Terminal and move to the API diretory
3. run `npm install` to install dependencies
4. run `npm run seed` to initialize and populate the database
5. run `npm start` to start the server, which will run on localhost:5000
6. In Terminal move to the client directory
7. run `npm install` to install dependencies
8. run `npm start` to start the server, which will run on localhost:3000