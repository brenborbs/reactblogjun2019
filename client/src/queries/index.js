import { gql } from "apollo-boost";

import { blogFragments } from "./fragments";

export const GET_ALL_BLOGS = gql`
  query {
    getAllBlogs {
      _id
      title
      imageUrl
      description
      category
    }
  }
`;

export const GET_BLOG = gql`
  query($_id: ID!) {
    getBlog(_id: $_id) {
      ...CompleteBlog
    }
  }
  ${blogFragments.blog}
`;

export const SEARCH_BLOGS = gql`
  query($searchTerm: String) {
    searchBlogs(searchTerm: $searchTerm) {
      _id
      title
      likes
      imageUrl
    }
  }
`;

export const ADD_BLOG = gql`
  mutation(
    $title: String!
    $imageUrl: String!
    $description: String!
    $category: String!
    $body: String!
    $username: String
  ) {
    addBlog(
      title: $title
      imageUrl: $imageUrl
      description: $description
      category: $category
      body: $body
      username: $username
    ) {
      ...CompleteBlog
    }
  }
  ${blogFragments.blog}
`;

export const LIKE_BLOG = gql`
  mutation($_id: ID!, $username: String!) {
    likeBlog(_id: $_id, username: $username) {
      ...LikeBlog
    }
  }
  ${blogFragments.like}
`;

export const UNLIKE_BLOG = gql`
  mutation($_id: ID!, $username: String!) {
    unlikeBlog(_id: $_id, username: $username) {
      ...LikeBlog
    }
  }
  ${blogFragments.like}
`;

export const DELETE_USER_BLOG = gql`
  mutation($_id: ID!) {
    deleteUserBlog(_id: $_id) {
      _id
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
        title
      }
    }
  }
`;

export const UPDATE_USER_BLOG = gql`
  mutation(
    $_id: ID!
    $title: String!
    $imageUrl: String!
    $description: String!
    $category: String!
  ) {
    updateUserBlog(
      _id: $_id
      title: $title
      imageUrl: $imageUrl
      description: $description
      category: $category
    ) {
      _id
      title
      likes
      category
      imageUrl
      description
    }
  }
`;

export const GET_USER_BLOGS = gql`
  query($username: String!) {
    getUserBlogs(username: $username) {
      _id
      title
      likes
      imageUrl
      category
      description
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
