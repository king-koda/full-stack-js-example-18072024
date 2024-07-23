import { useMutation, useQuery } from "@apollo/client";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";
import { PostType } from "../types";
import { GET_POSTS, UPDATE_POST_ORDER } from "./graphql/post";
import { Post } from "./Post";

const POST_LIMIT = 20;

export const Feed = () => {
  const {
    loading: isGetPostsLoading,
    error: getPostsError,
    data: getPostsResult,
    fetchMore,
  } = useQuery(GET_POSTS, { variables: { cursor: 0, limit: POST_LIMIT } });

  const [posts, setPosts] = useState<PostType[]>([]);

  const [dragStartId, setDragStartId] = useState<number | null>(null);
  const [dragStopId, setDragStopId] = useState<number | null>(null);

  const [updatePostOrder, { loading: isUpdatePostOrderLoading }] =
    useMutation(UPDATE_POST_ORDER);

  useEffect(() => {
    setPosts(getPostsResult?.getPosts);
  }, [getPostsResult?.getPosts]);

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
                cursor: "move",
              }}
              onDragEnter={(e) => {
                e.preventDefault();
              }}
              onDragStart={(e) => {
                setDragStartId(post.id);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragStopId(post.id);
              }}
              onDrop={async (e) => {
                e.preventDefault();
                await updatePostOrder({
                  variables: {
                    firstPostId: dragStartId,
                    secondPostId: dragStopId,
                  },
                });
              }}
              draggable={true}
              id={"grid-item-" + post.id}
              key={post.id}
            >
              {/* set a waypoint at every 20th post */}
              {(index + 1) % POST_LIMIT === 0 && (
                <Waypoint
                  onEnter={async () => {
                    // only fetch more if we are at the end of the list
                    if (index + 1 !== posts.length) return;
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
