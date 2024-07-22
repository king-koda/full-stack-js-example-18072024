import { useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { GET_POSTS } from "./graphql/post";
import { Post } from "./Post";

type Post = {
  id: number;
  title: string;
  content: string;
  order: number;
  createdAt: string;
};

export const Feed = () => {
  const result = useQuery(GET_POSTS);

  const [posts, setPosts] = useState<Post[]>(result?.data ?? []);

  useEffect(() => {
    setPosts(result?.data?.getPosts);
  }, [result?.data?.getPosts]);

  return (
    <>
      <Grid
        container
        columns={4}
        spacing={2}
        justifyContent={"center"}
        sx={{
          mt: "0 !important",
          ml: "0 !important",
        }}
      >
        {posts?.length > 0 &&
          posts.map((post) => (
            <Grid
              item
              sx={{
                minWidth: "400px",
                maxWidth: "400px",
                minHeight: "300px",
                maxHeight: "300px",
                pl: "0 !important",
                pt: "0 !important",
                m: 2,
              }}
              id={"grid-item-" + post.id}
              key={post.id}
            >
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                createdAt={post.createdAt}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
};
