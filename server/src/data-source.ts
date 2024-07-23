import { DataSource } from "typeorm";
import { Post } from "./entity/Post";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [Post],
  subscribers: [],
  migrations: [],
  url: process.env.POSTGRES_URL,
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
