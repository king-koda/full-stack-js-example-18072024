import { useQuery, useSubscription } from "@apollo/client";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { POST_LIMIT } from "../constants";
import { PostType } from "../types";
import { GET_POSTS, POSTS_REORDERED } from "./graphql/post";
import { GridPost } from "./GridPost";

export const Feed = () => {
  // query for fetching posts
  const {
    data: getPosts,
    refetch,
    fetchMore,
  } = useQuery(GET_POSTS, {
    variables: { cursor: 0, limit: POST_LIMIT },
  });

  const posts = getPosts?.getPosts;

  // the subscription we setup to listen for posts being reordered
  const { data: postsReordered } = useSubscription(POSTS_REORDERED);

  // const [posts, setPosts] = useState<PostType[]>([]);
  const [dragStartId, setDragStartId] = useState<number | null>(null);
  // gives the child components knowledge of which of them are being swapped, allowing a spinner
  const [isSwapping, setIsSwapping] = useState<{
    firstPostId: number;
    secondPostId: number;
  } | null>(null);

  // the function to handle fetching more posts when the user reaches the waypoints as they scroll
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

  // watches for when two posts are swapped, to then trigger the refetch and conclusion of the swap
  useEffect(() => {
    if (postsReordered?.postsReordered) {
      const refetchData = async () => {
        // refetch the exact amount of posts that are currently loaded, to eliminate jitter and smoothen out the drag and drop feature
        await refetch({
          cursor: 0,
          limit: posts.length,
        });
        // await the refetch to complete first before setting isSwapping to null
        // to prevent the loading spinner disappearing too early
        setIsSwapping(null);
      };

      refetchData();
    }
  }, [postsReordered?.postsReordered]);

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
