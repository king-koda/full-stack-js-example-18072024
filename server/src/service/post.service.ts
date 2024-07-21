import { getDataSource } from "../data-source";
import { Post } from "../entity/Post";

export const getPosts = async () => {
  const dataSource = await getDataSource();
  const posts = await dataSource
    .getRepository(Post)
    .find({ order: { order: "ASC" } });
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

  try {
    let post = await dataSource
      .getRepository(Post)
      .findOneOrFail({ where: { id } });

    post.title = title;
    post.content = content;

    post = await dataSource.getRepository(Post).save(post);
    console.info(`Updated post with ID: ${post.id}.`);
    return post;
  } catch (error) {
    console.error(`Failed to update post with ID: ${id}`);
    throw error;
  }
};

export const updatePostOrder = async (args: {
  firstPostId: number;
  secondPostId: number;
}) => {
  const { firstPostId, secondPostId } = args;
  const dataSource = await getDataSource();

  try {
    const firstPostDB = await dataSource
      .getRepository(Post)
      .findOneOrFail({ where: { id: firstPostId } });
    const secondPostDB = await dataSource
      .getRepository(Post)
      .findOneOrFail({ where: { id: secondPostId } });

    const placeholderOrder = structuredClone(firstPostDB.order);
    firstPostDB.order = secondPostDB.order;
    secondPostDB.order = placeholderOrder;

    await dataSource.getRepository(Post).save([firstPostDB, secondPostDB]);
    console.info(
      `Swapped the ordering of posts of ID: ${firstPostId} and ${secondPostId}.`
    );
    return true;
  } catch (error) {
    console.error(
      `Failed to swap the ordering of posts of ID: ${firstPostId} and ${secondPostId}.`
    );
    throw error;
  }
};
