import 'reflect-metadata';
import { Post } from './entity/Post';
import { AppDataSource } from './data-source';
const express = require('express');

// TODO: move to config file
const port = 3000;

const app = express();

if (!AppDataSource.isInitialized) {
  AppDataSource.initialize()
    .then(async () => {})
    .catch((error) => console.log(error));
}

app.get('/post', async (req, res) => {
  const post = new Post();

  post.title = 'My first post';
  post.content = 'Hello world!';
  post.order = 1;

  const repo = AppDataSource.getRepository(Post);
  await repo.save(post);
});

app.get('/', (req, res) => {
  console.log('Hiya!');
});

app.listen(port);
