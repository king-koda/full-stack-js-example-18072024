import { useMutation, useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";
import { PostType } from "../types";
import { GET_POSTS, UPDATE_POST_ORDER } from "./graphql/post";
import { Post } from "./Post";

const POST_LIMIT = 30;

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

  const [updatePostOrder] = useMutation(UPDATE_POST_ORDER);

  useEffect(() => {
    setPosts(getPostsResult?.getPosts);
  }, [getPostsResult?.getPosts]);

  const [isSwapping, setIsSwapping] = useState<{
    firstPostId: number;
    secondPostId: number;
  } | null>(null);

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
                cursor: isSwapping ? "wait" : "move",
              }}
              onDragEnter={(e) => {
                // removes the "not allowed" cursor when dragging cursor over a post
                e.preventDefault();
              }}
              onDragStart={() => {
                setDragStartId(post.id);
              }}
              onDragOver={(e) => {
                // removes the "not allowed" cursor when dragging a post
                e.preventDefault();
              }}
              onDrop={async () => {
                // if the first post to swap is not set, return
                if (!dragStartId) return;
                // prevent sending a graphql request if the start and stop id is the same
                if (dragStartId === post.id) return;

                setIsSwapping({
                  firstPostId: dragStartId,
                  secondPostId: post.id,
                });

                await updatePostOrder({
                  variables: {
                    firstPostId: dragStartId,
                    secondPostId: post.id,
                  },
                });

                // refetch the exact amount of posts that are currently loaded, to eliminate jitter and smoothen out the drag and drop feature
                await refetch({
                  cursor: 0,
                  limit: posts.length,
                });

                setIsSwapping(null);
              }}
              draggable={true}
              id={"grid-item-" + post.id}
            >
              {/* set a waypoint at every POST_LIMIT/2 post */}
              {(index + 1) % (POST_LIMIT / 2) === 0 && (
                <Waypoint
                  key={"waypoint-" + post.id}
                  onEnter={async () => {
                    // only fetch more if we are at the end of the list
                    if (index + 1 !== posts.length - POST_LIMIT / 2) return;

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
                          getPosts: [
                            ...prev.getPosts,
                            ...fetchMoreResult.getPosts,
                          ],
                        };
                      },
                    }).catch((error) => {
                      console.error(
                        "ApolloError during fetchMore:",
                        error.message
                      );
                    });
                  }}
                />
              )}
              <Post
                id={post.id}
                title={post.title}
                content={post.content}
                createdAt={post.createdAt}
                isSwapping={isSwapping}
              />
            </Grid>
          ))}
      </Grid>
    </>
  );
};
