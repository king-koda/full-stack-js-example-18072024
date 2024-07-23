import { getDataSource } from "../data-source";
import { Post } from "../entity/Post";
import { getPubSub } from "../pub-sub";

export type GetPostArgs = {
  cursor?: number;
  limit: number;
};

/** Query for fetching all available posts */
// TODO: add necessary code/args for pagination/ infinite scrolling
export const getPosts = async (args: GetPostArgs) => {
  const { cursor, limit } = args;
  const dataSource = await getDataSource();
  // Fetch all posts in ascending order to allow their positions to be swapped and updated easily
  const posts = await dataSource
    .getRepository(Post)
    .find({ order: { order: "ASC" }, skip: cursor ?? 0, take: limit });
  console.info(
    `Fetched posts from ${cursor ?? 0} to ${posts[posts.length - 1]?.id}.`
  );
  return posts;
};

export type UpdatePostArgs = {
  id: number;
  title: string;
  content: string;
};

/** Mutation for updating the title and content of a given post.
 * @param args.id - The ID of the post to update.
 * @param args.title - The new title of the post.
 * @param args.content - The new content of the post.
 * @returns The updated post if successful.
 */
export const updatePost = async (args: UpdatePostArgs) => {
  const { id, title, content } = args;
  const dataSource = await getDataSource();
  const pubsub = getPubSub();

  try {
    let post = await dataSource
      .getRepository(Post)
      .findOneOrFail({ where: { id } });

    post.title = title;
    post.content = content;

    post = await dataSource.getRepository(Post).save(post);
    pubsub.publish("POST_UPDATED", { postUpdated: args });

    console.info(`Updated post with ID: ${post.id}.`);
    return post;
  } catch (error) {
    console.error(`Failed to update post with ID: ${id}`);
    throw error;
  }
};

export type ReorderPostsArgs = {
  firstPostId: number;
  secondPostId: number;
};

/** Mutation for swapping the order of two given posts.
 * @param firstPostId - The ID of the first post of the swap.
 * @param secondPostId - The ID of the second post of the swap.
 * @returns True if successful.
 */
export const reorderPosts = async (args: ReorderPostsArgs) => {
  const { firstPostId, secondPostId } = args;
  const dataSource = await getDataSource();
  const pubsub = getPubSub();

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
    pubsub.publish("POSTS_REORDERED", { postsReordered: args });

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
