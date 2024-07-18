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
- "npm run db-setup" -> pulls the latest postgres image from docker site and initializes it with the config found @ server/docker-compose.yml

# Assumptions

- that the user has Docker Desktop, docker installed, or can install docker
- as this is a small project and test, and only one person is working on it (me), commits are being pushed straight to main rather than branching for each change to reduce unneccessary overhead

# Design Decisions

- expressJS framework for the web server as there was no criteria to use any particular web framework, and as the application is so simple, a minimal setup will suffice
- docker to reduce the manual setup required for users running the application locally, allowing the DB to be setup with one simple command
