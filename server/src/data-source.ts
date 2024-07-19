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

export const initializeDataSource = async () => {
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
      console.info("Data source initialized.");
      return;
    } catch (error) {
      const errorMsg = "Unable to initialize data source.";
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
  }
};

export const getDataSource = async () => {
  await initializeDataSource();
  return AppDataSource;
};
