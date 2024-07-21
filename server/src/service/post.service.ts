import { getDataSource } from "../data-source";
import { Post } from "../entity/Post";

export const getPosts = async () => {
  const dataSource = await getDataSource();
  const posts = await dataSource.getRepository(Post).find();
  console.info(`Fetched ${posts.length} posts.`);
  return posts;
};

export const updatePost = async (args: {
  id: number;
  title: string;
  content: string;
}) => {
  const { id, title, content } = args;
  const dataSource = await getDataSource();
  let post = await dataSource.getRepository(Post).findOne({ where: { id } });
  post.title = title;
  post.content = content;
  post = await dataSource.getRepository(Post).save(post);
  console.info(`Updated post with ID: ${post.id}.`);
  return post;
};

export const updatePostOrder = async (args: {
  firstPostId: number;
  secondPostId: number;
}) => {
  const { firstPostId, secondPostId } = args;
  const dataSource = await getDataSource();
  const firstPostDB = await dataSource
    .getRepository(Post)
    .findOne({ where: { id: firstPostId } });
  const secondPostDB = await dataSource
    .getRepository(Post)
    .findOne({ where: { id: secondPostId } });

  const placeholderOrder = structuredClone(firstPostDB.order);
  firstPostDB.order = secondPostDB.order;
  secondPostDB.order = placeholderOrder;

  await dataSource.getRepository(Post).save([firstPostDB, secondPostDB]);

  console.info(
    `Swapped the ordering of posts of ID: ${firstPostId} and ${secondPostId}.`
  );

  // TODO: decide whether to return a boolean or not as described in the schema
};
