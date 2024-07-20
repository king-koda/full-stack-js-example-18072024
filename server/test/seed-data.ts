import { faker } from "@faker-js/faker";
import { getDataSource } from "../src/data-source";
import { Post } from "../src/entity/Post";

const ds = await getDataSource();

try {
  await ds.transaction(async (manager) => {
    for (let i = 0; i < 300; i++) {
      await manager
        .getRepository(Post)
        .save({ content: faker.word.words(8), title: faker.word.words(2) });
    }
    console.info("Seed data created.");
  });
} catch (error) {
  console.info("Error creating seed data.");
}
