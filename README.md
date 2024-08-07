# Full Stack JS Example

# Application URL
https://full-stack-js-example-18072024-client.vercel.app/

# Project overview

An example application for managing posts.
Built with:

- ReactJS
- GraphQL
- Apollo
- NodeJS
- PostgreSQL
- TypeORM

# Setup instructions

1. Clone the repo
2. Install project dependencies with "npm i" in root directory (installs client and server dependencies)
3. Install Docker Desktop and make sure that it has WSL2 integration enabled if running the application in WSL
4. Run "npm run db-setup" in the server directory
5. Run "npm run dev" in the server directory in one terminal (to run in development mode)
6. Run "npm run start" in the client directory in another terminal
7. Visit localhost:5173, and use the application

# Available scripts

Server:

- "npm run dev" -> runs the server using the TS files only
- "npm run db-setup" -> pulls the latest postgres image from docker site and initializes it with the config found @ server/docker-compose.yml, and then populates the db with some fake seed data
- "npm run test" -> runs all the test files in the directory using vitest, and re-runs the tests on any new changes
- "npm run build" -> builds the application from TS files into folder dist/
- "npm run start" -> to be used after build, runs application as it would in prod

Client:

- "npm run start" -> runs the FE application and auto compiles at the same time to dist/
- "npm run build" -> builds the application from TS files into folder dist/ with its assets
- 
# Assumptions

- that the user has Docker Desktop, docker installed, or can install docker
- as this is a small project and test, and only one person is working on it (me), commits are being pushed straight to main rather than branching for each change to reduce unneccessary overhead
- that new data is to be seeded to the application on every initial launch
- that the user would like to also create posts alongside the already generated data
- that new posts created would appear at the start of the list of posts naturally
- that the ordering of posts is persisted on the server side and visible on the client side
- that the title of the post being clipped and prevented in overflowing isn't a huge issue to the user
- that creating a post isn't a requirement for the user

# Design Decisions

- docker to reduce the manual setup required for users running the application locally, allowing the DB to be setup with one simple command
- migrated from ts-node to tsx due to technical issues, which were immediately resolved when using tsx instead
- emitting the compiled JS files alongside the ts files or in their own dist folder felt unneccessary for the project, so noEmit was enabled in tsconfig.json
- used a fairly primitive drag and drop solution for the posts, without use of an external library, decided on this as I was able to get the functionality I wanted, it looked nice enough in my opinion, and it gave me more control over how I wanted the application to behave
- chose Vite React over CRA for speed and minimalism, as its only a small project CRA might be overkill, used the create vite@latest command to get the groundwork done
- using react-waypoint for handling the tracking of elements in the list to know when its time to refetch more posts to allow infinite scrolling, chose it because its a wrapper that is clean and simple to use
- decided to continue using pubsub although it isn't recommended in production environments, due to this being a relatively small project, and it isn't expected to be used by many people at once very often
- paginated application using apollo's recommended tools approach
- decided to use Formik as MUI appeared to not have all the necessary components for building a form, Formik was a simple and effective solution with good extensibility if required
- as the database is full of fake data, instead of mocking the data source and return values, the tests will just use data from the DB and get/save directly from/to it
