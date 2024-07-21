import { ApolloServerOptionsWithTypeDefs } from "@apollo/server";
import { getPosts, updatePost, updatePostOrder } from "../service/post.service";

export const postResolvers = {
  Query: {
    getPosts: getPosts,
  },
  Mutation: {
    updatePost: (_, args) => updatePost(args),
    updatePostOrder: (_, args) => updatePostOrder(args),
  },
};

export default postResolvers;
