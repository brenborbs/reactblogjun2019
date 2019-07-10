exports.typeDefs = `


type Blog {
  _id: ID
  title: String!
  category : String!
  description: String!
  body: String!
  createdDate: String
  likes: Int
  username: String
}


type User {
  _id: ID
  username: String! @unique
  password: String!
  email: String!
  joinDate: String
  favorites: [Blog]
}

type Query{
  getAllBlogs: [Blog]
  getBlog(_id: ID!): Blog
  searchBlogs(searchTerm: String): [Blog]
  getCurrentUser: User
}

type Token {
  token: String!
}

type Mutation {
  addBlog(title: String! , description: String! , category: String!, body: String!, username: String): Blog

  signinUser(username: String!, password: String!): Token

  signupUser(username: String!, email: String!, password: String!): Token

}

`;
