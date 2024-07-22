import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
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
