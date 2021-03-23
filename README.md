# Reedly

## Summary
Readly is a web application inspired by Feedly using React/Redux for the frontend and python on the backend. Readly allows users to create an account or be on a demo account and to browse news that they deem relevant.  Each user can organize their news into sections called feeds.  Each feed is then made up of sources, such as TechCrunch or The Verge.  These sources use an RSS link to populate articles into each users feed allowing the user to tailor their news to their intrests.


## Overall Structure

### Backend

The app was built using Pythong on the backend with a postgresSQL database.  All routes are RESTful and done using a JSON API

### Frontend
The font end is built using React.js and Redux.

### Libraries
Readly uses:
 - [React.js](https://reactjs.org/)
 - [Redux](https://redux.js.org/)
 - [BCrypt](https://pypi.org/project/bcrypt/) for authorization
 - [RSS](https://en.wikipedia.org/wiki/RSS) feeds for accessing article data
 - [Python3](https://www.python.org/) for all backend routes and queries
 - [PostgresSQL](https://www.postgresql.org/) for data storage


 ## Primary Components
