import fs from "fs";
import path from "path";

const __dirname = path.resolve();
// read graphql schema from file into a string
const typeDefs = `${fs.readFileSync(__dirname + "/src/schema.graphql")}`;

export default typeDefs;
