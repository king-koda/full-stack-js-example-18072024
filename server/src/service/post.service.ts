import { getDataSource } from "../data-source";
import { Post } from "../entity/Post";

export const getPosts = async () => {
  const dataSource = await getDataSource();
  const posts = await dataSource.getRepository(Post).find();
  console.log("hello");
  console.log(posts);
  return posts;
};

export const createPost = async () => {
  const dataSource = await getDataSource();
  const posts = await dataSource.getRepository(Post).find();
  console.log("hello");
  console.log(posts);
  return posts;
};
