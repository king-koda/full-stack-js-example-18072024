import { faker } from "@faker-js/faker";
import { getDataSource } from "../src/data-source";
import { Post } from "../src/entity/Post";
import _ from "lodash";

const ds = await getDataSource();

try {
  await ds.transaction(async (manager) => {
    let seedPosts: Omit<Post, "id">[] = [];
    for (let i = 0; i < 400; i++) {
      const newDate = faker.date.recent({ days: 30, refDate: new Date() });
      seedPosts.push({
        content: faker.word.words(8),
        title: faker.word.words(2),
        createdAt: newDate.toString(),
      });
    }

    // creating all the seed data and sorting by createdAt before persisting is to prevent the primary keys being out of order
    seedPosts = _.sortBy(seedPosts, (post) => post.createdAt);

    await manager.getRepository(Post).save(seedPosts);
    console.info("Seed data created.");
  });
} catch (error) {
  console.info("Error creating seed data.");
  throw error;
}
