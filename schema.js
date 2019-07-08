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
}

type Mutation {
  addBlog(title: String! , description: String! , category: String!, body: String!, username: String): Blog
}

`;
