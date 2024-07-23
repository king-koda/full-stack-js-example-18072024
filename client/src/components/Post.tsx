import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { dateFormatter } from "../utils/date";
import { UPDATE_POST } from "./graphql/post";

type PostProps = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  isSwapping: {
    firstPostId: number;
    secondPostId: number;
  } | null;
  setIsEditing: (isEditing: boolean) => void;
  isEditing: boolean;
};

type PostForm = {
  title: string;
  content: string;
};

export const Post = ({
  id,
  title,
  content,
  createdAt,
  isSwapping,
  setIsEditing,
  isEditing,
}: PostProps) => {
  const isBeingSwapped =
    isSwapping &&
    (isSwapping.firstPostId === id || isSwapping.secondPostId === id);

  const [updatePost] = useMutation(UPDATE_POST);

  const submitForm = async (values: PostForm) => {
    // if no values have changed, no point submitting
    if (values.content !== content || values.title !== title) {
      await updatePost({ variables: { id, ...values } });
    }
    setIsEditing(false);
  };

  return (
    <Formik<PostForm>
      initialValues={{ title, content }}
      onSubmit={async (values, { setSubmitting }) => {
        await submitForm(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, resetForm }) => (
        <Form style={{ height: "100%", width: "100%" }}>
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
                <CardContent
                  id={"post-header-" + id}
                  sx={{
                    height: "20%",
                    width: "100%",
                    padding: 0,
                    textAlign: "start",
                    ml: 2,
                    overflow: "clip",
                  }}
                  contentEditable={isEditing}
                >
                  <Stack direction={"row"} alignItems={"center"}>
                    {!isEditing ? (
                      <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        component="div"
                        sx={{ height: "100%", width: "70%", overflow: "clip" }}
                      >
                        {title}
                      </Typography>
                    ) : (
                      <Field
                        name="title"
                        render={({ field }: { field: any }) => (
                          <Input
                            {...field}
                            sx={{ height: "100%", width: "50%" }}
                            disableUnderline
                          />
                        )}
                      />
                    )}
                    {!isEditing && (
                      <Button
                        variant="contained"
                        sx={{ margin: 2, placeSelf: "flex-start" }}
                        onClick={() => setIsEditing(true)}
                        id="edit-button"
                      >
                        Edit
                      </Button>
                    )}
                    {isEditing && (
                      <>
                        <Button
                          variant="contained"
                          sx={{
                            margin: 2,
                            marginLeft: 1,
                            marginRight: 1,
                            placeSelf: "flex-start",
                          }}
                          id="cancel-button"
                          disabled={isSubmitting}
                          color="error"
                          onClick={() => {
                            setIsEditing(false);
                            resetForm({ values: { title, content } });
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            margin: 2,
                            marginLeft: 0,
                            placeSelf: "flex-start",
                          }}
                          type="submit"
                          id="save-button"
                          disabled={isSubmitting}
                        >
                          Save
                        </Button>
                      </>
                    )}
                  </Stack>
                </CardContent>
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
                  {!isEditing ? (
                    <Typography variant="body1" component="div">
                      {content}
                    </Typography>
                  ) : (
                    <Field
                      name="content"
                      disableUnderline
                      render={({ field }: { field: any }) => (
                        <Input
                          {...field}
                          multiline
                          sx={{ height: "100%", width: "100%" }}
                          disableUnderline
                        />
                      )}
                    />
                  )}
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
                    <Typography
                      id={"post-footer-created-at" + id}
                      variant="caption"
                    >
                      {dateFormatter.format(Number(createdAt))}
                    </Typography>
                  </Box>
                  <Box
                    id={"post-footer-post-no-box" + id}
                    sx={{ direction: "row" }}
                  >
                    <Typography
                      id={"post-footer-post-no-heading" + id}
                      variant="caption"
                      fontWeight={"bold"}
                      sx={{ mr: "4px" }}
                    >
                      Post No:
                    </Typography>
                    <Typography
                      id={"post-footer-post-no" + id}
                      variant="caption"
                    >
                      {id}
                    </Typography>
                  </Box>
                </Stack>
              </>
            )}
          </Card>
        </Form>
      )}
    </Formik>
  );
};
