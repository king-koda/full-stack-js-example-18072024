import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts($cursor: Int, $limit: Int!) {
    getPosts(cursor: $cursor, limit: $limit) {
      id
      title
      content
      order
      createdAt
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $title: String!, $content: String!) {
    updatePost(id: $id, title: $title, content: $content) {
      id
      title
      content
      order
      createdAt
    }
  }
`;

export const UPDATE_POST_ORDER = gql`
  mutation UpdatePostOrder($firstPostId: ID!, $secondPostId: ID!) {
    updatePostOrder(firstPostId: $firstPostId, secondPostId: $secondPostId)
  }
`;

export const POSTS_REORDERED = gql`
  subscription PostsReordered {
    postsReordered {
      firstPostId
      secondPostId
    }
  }
`;
