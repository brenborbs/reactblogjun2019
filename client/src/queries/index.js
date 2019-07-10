import { gql } from "apollo-boost";

export const GET_ALL_BLOGS = gql`
  query {
    getAllBlogs {
      _id
      title
      description
      category
    }
  }
`;

export const GET_BLOG = gql`
  query($_id: ID!) {
    getBlog(_id: $_id) {
      _id
      title
      category
      description
      body
      createdDate
      likes
      username
    }
  }
`;

export const SEARCH_BLOGS = gql`
  query($searchTerm: String) {
    searchBlogs(searchTerm: $searchTerm) {
      _id
      title
      likes
    }
  }
`;

export const ADD_BLOG = gql`
  mutation(
    $title: String!
    $description: String!
    $category: String!
    $body: String!
    $username: String
  ) {
    addBlog(
      title: $title
      description: $description
      category: $category
      body: $body
      username: $username
    ) {
      _id
      title
      category
      description
      body
      createdDate
      likes
    }
  }
`;

// User Queries

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      joinDate
      email
      favorites {
        _id
        username
      }
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;
