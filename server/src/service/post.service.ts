import { getDataSource } from "../data-source";
import { Post } from "../entity/Post";

export const getPosts = async () => {
  const dataSource = await getDataSource();
  const posts = await dataSource.getRepository(Post).find();
  console.info(`Fetched ${posts.length} posts.`);
  return posts;
};
