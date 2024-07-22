import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { GET_POSTS, UPDATE_POST_ORDER } from "./graphql/post";
import { Post } from "./Post";

type Post = {
  id: number;
  title: string;
  content: string;
  order: number;
  createdAt: string;
};

export const Feed = () => {
  const {
    loading: isGetPostsLoading,
    error: getPostsError,
    data: getPostsResult,
    refetch,
  } = useQuery(GET_POSTS);

  const [posts, setPosts] = useState<Post[]>(getPostsResult?.data ?? []);

  useEffect(() => {
    setPosts(getPostsResult?.getPosts);
  }, [getPostsResult?.getPosts]);

  const [dragStartId, setDragStartId] = useState<number | null>(null);
  const [dragStopId, setDragStopId] = useState<number | null>(null);

  const [
    updatePostOrder,
    {
      data: updatePostOrderResult,
      loading: isUpdatePostOrderLoading,
      error: updatePostOrderError,
    },
  ] = useMutation(UPDATE_POST_ORDER);

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
                cursor: "move",
              }}
              onDragStart={(e) => {
                setDragStartId(post.id);
              }}
              onDragOver={(e) => {
                setDragStopId(post.id);
              }}
              onDragEnd={async (e) => {
                if (dragStartId !== dragStopId) {
                  await updatePostOrder({
                    variables: {
                      firstPostId: dragStartId,
                      secondPostId: dragStopId,
                    },
                  });
                  await refetch();
                }
              }}
              draggable={true}
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
