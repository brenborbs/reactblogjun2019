exports.resolvers = {
  Query: {
    getAllBlogs: async (root, args, { Blog }) => {
      const AllBlogs = await Blog.find();
      return AllBlogs;
    }
  },

  Mutation: {
    addBlog: async (
      root,
      { title, description, category, body, username },
      { Blog }
    ) => {
      const newBlog = await new Blog({
        title,
        description,
        category,
        body,
        username
      }).save();
      return newBlog;
    }
  }
};
