import postResolvers from "./post.resolver";

/** A combination of all current and future resolvers */
const resolvers = { ...postResolvers };

export default resolvers;
