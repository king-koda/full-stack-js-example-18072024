import { getPubSub } from "../pub-sub";
import {
  UpdatePostArgs,
  UpdatePostOrderArgs,
  getPosts,
  updatePost,
  updatePostOrder,
} from "../service/post.service";

const pubsub = getPubSub();

export const postResolvers = {
  Query: {
    getPosts: getPosts,
  },
  Subscription: {
    postsReordered: {
      subscribe: () => pubsub.asyncIterator(["POSTS_REORDERED"]),
    },
  },
  Mutation: {
    updatePost: (parent: undefined, args: UpdatePostArgs) => updatePost(args),
    updatePostOrder: (parent: undefined, args: UpdatePostOrderArgs) =>
      updatePostOrder(args),
  },
};

export default postResolvers;
