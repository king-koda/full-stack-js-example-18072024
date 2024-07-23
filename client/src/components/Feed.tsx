import { useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { PostType } from "../types";
import { GET_POSTS } from "./graphql/post";
import { GridPost } from "./GridPost";
import { POST_LIMIT } from "../constants";

export const Feed = () => {
  const {
    data: getPostsResult,
    refetch,
    fetchMore,
  } = useQuery(GET_POSTS, {
    variables: { cursor: 0, limit: POST_LIMIT },
  });

  const [posts, setPosts] = useState<PostType[]>([]);
  const [dragStartId, setDragStartId] = useState<number | null>(null);
  const [isSwapping, setIsSwapping] = useState<{
    firstPostId: number;
    secondPostId: number;
  } | null>(null);

  useEffect(() => {
    setPosts(getPostsResult?.getPosts);
  }, [getPostsResult?.getPosts]);

  const fetchMorePosts = async () => {
    await fetchMore({
      // fetch more posts using the id of the last post in the list as the offset
      variables: {
        cursor: Number(posts[posts.length - 1].id),
        limit: POST_LIMIT,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        // if there are no more posts to fetch, return the current list
        if (!fetchMoreResult) return prev;

        // merge the current list with the new list
        return {
          getPosts: [...prev.getPosts, ...fetchMoreResult.getPosts],
        };
      },
    });
  };

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
        key="grid-container"
      >
        {posts?.length > 0 &&
          posts.map((post: PostType, index: number) => (
            <GridPost
              index={index}
              post={post}
              refetch={refetch}
              fetchMore={fetchMorePosts}
              totalPosts={posts.length}
              dragStartId={dragStartId}
              setDragStartId={setDragStartId}
              isSwapping={isSwapping}
              setIsSwapping={setIsSwapping}
            />
          ))}
      </Grid>
    </>
  );
};
