import { gql } from "apollo-boost";

export const blogFragments = {
  blog: gql`
    fragment CompleteBlog on Blog {
      _id
      title
      imageUrl
      category
      description
      body
      createdDate
      likes
      username
    }
  `,
  like: gql`
    fragment LikeBlog on Blog {
      _id
      likes
    }
  `
};
