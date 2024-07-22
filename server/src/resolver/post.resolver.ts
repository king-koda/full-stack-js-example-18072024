import {
  UpdatePostArgs,
  UpdatePostOrderArgs,
  getPosts,
  updatePost,
  updatePostOrder,
} from "../service/post.service";

export const postResolvers = {
  Query: {
    getPosts: getPosts,
  },
  Mutation: {
    updatePost: (parent: undefined, args: UpdatePostArgs) => updatePost(args),
    updatePostOrder: (parent: undefined, args: UpdatePostOrderArgs) =>
      updatePostOrder(args),
  },
};

export default postResolvers;
