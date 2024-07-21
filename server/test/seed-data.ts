import { faker } from "@faker-js/faker";
import { getDataSource } from "../src/data-source";
import { Post } from "../src/entity/Post";

const ds = await getDataSource();

try {
  await ds.transaction(async (manager) => {
    let newDate = faker.date.recent({ days: 7, refDate: new Date() });
    for (let i = 0; i < 400; i++) {
      await manager.getRepository(Post).save({
        content: faker.word.words(8),
        title: faker.word.words(2),
        createdAt: newDate.toString(),
      });

      newDate = faker.date.between({ from: newDate, to: new Date() });
    }
    console.info("Seed data created.");
  });
} catch (error) {
  console.info("Error creating seed data.");
  throw error;
}
