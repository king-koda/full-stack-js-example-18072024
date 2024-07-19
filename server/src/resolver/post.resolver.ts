import { getPosts } from "../service/post.service";

export const postResolvers = {
  Query: {
    posts: getPosts,
  },
};

export default postResolvers;
