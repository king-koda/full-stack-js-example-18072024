import { getPubSub } from "../pub-sub.js";
import { getPosts, reorderPosts, updatePost, } from "../service/post.service.js";
const pubsub = getPubSub();
export const postResolvers = {
    Query: {
        getPosts: (parent, args) => getPosts(args),
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
        updatePost: (parent, args) => updatePost(args),
        reorderPosts: (parent, args) => reorderPosts(args),
    },
};
export default postResolvers;
