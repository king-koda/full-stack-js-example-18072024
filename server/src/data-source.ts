import { DataSource } from 'typeorm';
import { Post } from './entity/Post';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'postit',
  database: 'postable',
  synchronize: true,
  logging: false,
  entities: [Post],
  subscribers: [],
  migrations: [],
});
