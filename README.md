# full-stack-js-example-18072024

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
2. Install project dependencies with "npm i" in root, client, and server directory
3. Install Docker Desktop and make sure that it has WSL2 integration enabled if running the application in WSL
4. Run "npm run db-setup" in the server directory
5. Start project with "npm run start" (to be finalised)

# Available scripts

Server:

- "npm run start" -> compiles TS files to JS and runs application with nodemon watching for changes to files and restarting server when required
- "npm run db-setup" -> pulls the latest postgres image from docker site and initializes it with the config found @ server/docker-compose.yml, and then populates the db with some fake seed data

# Assumptions

- that the user has Docker Desktop, docker installed, or can install docker
- as this is a small project and test, and only one person is working on it (me), commits are being pushed straight to main rather than branching for each change to reduce unneccessary overhead
- that new data is to be seeded to the application on every initial launch
- that the user would like to also create posts alongside the already generated data
- that new posts created would appear at the start of the list of posts naturally
- that the ordering of posts is purely on the client side

# Design Decisions

- docker to reduce the manual setup required for users running the application locally, allowing the DB to be setup with one simple command
- migrated from ts-node to tsx due to technical issues, which were immediately resolved when using tsx instead
- emitting the compiled JS files alongside the ts files or in their own dist folder felt unneccessary for the project, so noEmit was enabled in tsconfig.json
