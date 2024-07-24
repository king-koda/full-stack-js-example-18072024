import { getPubSub } from "../pub-sub.js";
import {
  GetPostsArgs,
  ReorderPostsArgs,
  UpdatePostArgs,
  getPosts,
  reorderPosts,
  updatePost,
} from "../service/post.service.js";

const pubsub = getPubSub();

export const postResolvers = {
  Query: {
    getPosts: (parent: undefined, args: GetPostsArgs) => getPosts(args),
  },
  Subscription: {
    postsReordered: {
      subscribe: () => pubsub.asyncIterator(["POSTS_REORDERED"]),
    },
    postUpdated: {
      subscribe: () => pubsub.asyncIterator(["POST_UPDATED"]),
    },
  },
  Mutation: {
    updatePost: (parent: undefined, args: UpdatePostArgs) => updatePost(args),
    reorderPosts: (parent: undefined, args: ReorderPostsArgs) =>
      reorderPosts(args),
  },
};

export default postResolvers;
