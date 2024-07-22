import {
  Card,
  CardContent,
  CardHeader,
  Divider,
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
        width: "100%",
        height: "100%",
      }}
    >
      <CardHeader
        title={title}
        sx={{ maxHeight: "20%", minHeight: "20%", overflow: "hidden" }}
      ></CardHeader>
      <Divider />
      <CardContent
        sx={{ maxHeight: "40%", minHeight: "40%", overflow: "hidden" }}
      >
        <Typography variant="body1" component="div" sx={{}}>
          {content}
        </Typography>
      </CardContent>
      <Divider />
      <Typography variant="body2" component="div">
        Created At: {formatter.format(Number(createdAt))}
      </Typography>
    </Card>
  );
};
