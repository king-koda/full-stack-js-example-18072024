import fs from "fs";
import path from "path";

// path differs betweene prod and dev environments
const pathToSchema = process.env.NODE_ENV === "prod" ? "/src" : "/src";
const __dirname = path.resolve();

// read graphql schema from file into a string
const typeDefs = `${fs.readFileSync(
  path.join(__dirname, pathToSchema, "/schema.graphql")
)}`;

export default typeDefs;
