import { DataSource } from "typeorm";
import { Post } from "./entity/Post";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "postit",
  database: "postable",
  synchronize: true,
  logging: false,
  entities: [Post],
  subscribers: [],
  migrations: [],
});

/** Initializes the data source so that its ready to receive operations from the application */
export const initializeDataSource = async () => {
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
      console.info("Data source initialized.");
      return;
    } catch (error) {
      console.error("Unable to initialize data source.");
      throw error;
    }
  }
};
/** Initializes and returns the required data source for accessing the DB */
export const getDataSource = async () => {
  await initializeDataSource();
  return AppDataSource;
};
