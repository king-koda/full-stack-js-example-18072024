import { getPubSub } from "../pub-sub";
import {
  GetPostArgs,
  ReorderPostsArgs,
  UpdatePostArgs,
  getPosts,
  reorderPosts,
  updatePost,
} from "../service/post.service";

const pubsub = getPubSub();

export const postResolvers = {
  Query: {
    getPosts: (parent: undefined, args: GetPostArgs) => getPosts(args),
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
