import { faker } from "@faker-js/faker/locale/en_AU";
import { Post } from "../entity/Post.js";
import { getDataSource } from "../data-source.js";

export async function seedData() {
  const ds = await getDataSource();

  try {
    const ds = await getDataSource();
    const posts = await ds.getRepository(Post).find();
    if (posts.length === 0) {
      await ds.transaction(async (manager) => {
        let newDate = new Date("2022-05-12");

        // creating 400 seeded posts with randomized titles and content,
        // and creation dates incrementing by 0 - 2 days each time from a reference date
        for (let i = 1; i <= 400; i++) {
          await manager.getRepository(Post).save({
            title: faker.lorem.words({ min: 1, max: 3 }),
            content: faker.lorem.paragraph(5),
            createdAt: newDate,
          });

          // increment 0-2 days since previous iterations date
          newDate = faker.date.soon({ days: 2, refDate: newDate });
        }

        console.info("Seed data created.");
      });
    }
  } catch (error) {
    console.info("Error creating seed data.");
    throw error;
  }
}

seedData();
