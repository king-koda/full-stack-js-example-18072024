import { useMutation } from "@apollo/client";
import { Grid } from "@mui/material";
import { Waypoint } from "react-waypoint";
import { POST_LIMIT } from "../constants";
import { PostType } from "../types";
import { UPDATE_POST_ORDER } from "./graphql/post";
import { Post } from "./Post";

type GridPostProps = {
  index: number;
  post: PostType;
  fetchMore: () => Promise<void>;
  totalPosts: number;
  dragStartId: number | null;
  setDragStartId: (dragStartId: number) => void;
  isSwapping: {
    firstPostId: number;
    secondPostId: number;
  } | null;
  setIsSwapping: React.Dispatch<
    React.SetStateAction<{
      firstPostId: number;
      secondPostId: number;
    } | null>
  >;
};

export const GridPost = ({
  index,
  post,
  fetchMore,
  totalPosts,
  dragStartId,
  setDragStartId,
  isSwapping,
  setIsSwapping,
}: GridPostProps) => {
  const [updatePostOrder] = useMutation(UPDATE_POST_ORDER);

  return (
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
            if (index + 1 !== totalPosts - POST_LIMIT / 2) return;

            await fetchMore().catch((error) => {
              console.error("ApolloError during fetchMore:", error.message);
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
  );
};
