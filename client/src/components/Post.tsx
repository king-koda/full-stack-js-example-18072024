import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { dateFormatter } from "../utils/date";

type PostProps = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  isSwapping: {
    firstPostId: number;
    secondPostId: number;
  } | null;
};

export const Post = ({
  id,
  title,
  content,
  createdAt,
  isSwapping,
}: PostProps) => {
  const isBeingSwapped =
    isSwapping &&
    (isSwapping.firstPostId === id || isSwapping.secondPostId === id);

  return (
    <Card
      id={"post-" + id}
      sx={{
        height: "100%",
        backgroundColor: "lightblue",
      }}
    >
      {isBeingSwapped && (
        <Box width={400} height={300} sx={{ placeContent: "center" }}>
          <CircularProgress size={200} disableShrink />
        </Box>
      )}
      {!isBeingSwapped && (
        <>
          <CardHeader
            id={"post-header-" + id}
            sx={{
              height: "20%",
              padding: 0,
              overflow: "clip",
              textAlign: "start",
              ml: 2,
            }}
            titleTypographyProps={{
              variant: "h5",
              fontWeight: "bold",
            }}
            title={title}
            action={
              <Button variant="contained" sx={{ margin: 2 }}>
                Edit
              </Button>
            }
          />
          <Divider />
          <CardContent
            id={"post-content-" + id}
            sx={{
              alignContent: "start",
              padding: "16px",
              boxSizing: "border-box",
              height: "70%",
              overflowX: "auto",
            }}
          >
            <Typography variant="body1" component="div">
              {content}
            </Typography>
          </CardContent>
          <Divider />
          <Stack
            id={"post-footer-stack-" + id}
            direction={"row"}
            width={"100%"}
            height={"10%"}
            sx={{ placeContent: "space-evenly", alignItems: "center" }}
          >
            <Box
              id={"post-footer-created-at-box" + id}
              sx={{ direction: "row" }}
            >
              <Typography
                id={"post-footer-created-at-heading" + id}
                variant="caption"
                fontWeight={"bold"}
                sx={{ mr: "4px" }}
              >
                Created At:
              </Typography>
              <Typography id={"post-footer-created-at" + id} variant="caption">
                {dateFormatter.format(Number(createdAt))}
              </Typography>
            </Box>
            <Box id={"post-footer-post-no-box" + id} sx={{ direction: "row" }}>
              <Typography
                id={"post-footer-post-no-heading" + id}
                variant="caption"
                fontWeight={"bold"}
                sx={{ mr: "4px" }}
              >
                Post No:
              </Typography>
              <Typography id={"post-footer-post-no" + id} variant="caption">
                {id}
              </Typography>
            </Box>
          </Stack>
        </>
      )}
    </Card>
  );
};
