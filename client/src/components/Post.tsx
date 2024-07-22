import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

type PostProps = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export const Post = ({ id, title, content, createdAt }: PostProps) => {
  const formatter = new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeZone: "Australia/Perth",
    timeStyle: "short",
  });

  return (
    <Card
      id={"post-" + id}
      sx={{
        height: "100%",
        backgroundColor: "lightblue",
      }}
    >
      <CardHeader
        id={"post-header-" + id}
        sx={{
          height: "20%",
          padding: 0,
          overflow: "clip",
        }}
        titleTypographyProps={{
          variant: "h5",
          fontWeight: "bold",
        }}
        title={title}
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
        <Box id={"post-footer-created-at-box" + id} sx={{ direction: "row" }}>
          <Typography
            id={"post-footer-created-at-heading" + id}
            variant="caption"
            fontWeight={"bold"}
            sx={{ mr: "4px" }}
          >
            Created At:
          </Typography>
          <Typography id={"post-footer-created-at" + id} variant="caption">
            {formatter.format(Number(createdAt))}
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
    </Card>
  );
};
