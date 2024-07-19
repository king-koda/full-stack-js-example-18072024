import { getDataSource } from "../src/data-source";
import { Post } from "../src/entity/Post";

const ds = await getDataSource();

// TODO: implement faker for the title and content of the posts, create ~300 posts
try {
  // TODO: run in a transaction
  ///
  await ds.getRepository(Post).save({ content: "Habba", title: "Wa" });
  await ds.getRepository(Post).save({ content: "Habba", title: "Ba" });
  await ds.getRepository(Post).save({ content: "Habba", title: "Ha" });
  await ds.getRepository(Post).save({ content: "Habba", title: "Haaaaaaaa" });
  console.info("Seed data created.");
  ///
} catch (error) {
  console.info("Error creating seed data.");
}
