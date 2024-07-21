import { faker } from "@faker-js/faker";
import { getDataSource } from "../src/data-source";
import { Post } from "../src/entity/Post";
import _ from "lodash";

const ds = await getDataSource();

try {
  await ds.transaction(async (manager) => {
    let newDate = new Date("2022-05-12");

    // creating 400 seeded posts with randomized titles and content,
    // and creation dates incrementing by 0 - 2 days each time from a reference date
    for (let i = 1; i <= 400; i++) {
      await manager.getRepository(Post).save({
        content: faker.word.words(8),
        title: faker.word.words(2),
        createdAt: newDate.toString(),
      });

      // increment 0-2 days since previous iterations date
      newDate = faker.date.soon({ days: 2, refDate: newDate });
    }

    console.info("Seed data created.");
  });
} catch (error) {
  console.info("Error creating seed data.");
  throw error;
}
