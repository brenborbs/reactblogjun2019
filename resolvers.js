const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getAllBlogs: async (root, args, { Blog }) => {
      const AllBlogs = await Blog.find().sort({ createdDate: "desc" });
      return AllBlogs;
    },
    getBlog: async (root, { _id }, { Blog }) => {
      const blog = await Blog.findOne({ _id });
      return blog;
    },
    searchBlogs: async (root, { searhTerm }, { Blog }) => {
      if (searhTerm) {
        // search
        const searchResults = await Blog.find(
          {
            $text: { $search: searchTerm }
          },
          {
            score: { $meta: "textScore" }
          }
        ).sort({
          score: { $meta: "textScore" }
        });
        return searchResults;
      } else {
        const blogs = await Blog.find().sort({
          likes: "desc",
          createdDate: "desc"
        });
        return blogs;
      }
    },
    getUserBlogs: async (root, { username }, { Blog }) => {
      const userBlogs = await Blog.find({ username }).sort({
        createdDate: "desc"
      });
      return userBlogs;
    },
    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({
        username: currentUser.username
      }).populate({
        path: "favorites",
        model: "Blog"
      });
      return user;
    }
  },

  Mutation: {
    addBlog: async (
      root,
      { title, imageUrl, description, category, body, username },
      { Blog }
    ) => {
      const newBlog = await new Blog({
        title,
        imageUrl,
        description,
        category,
        body,
        username
      }).save();
      return newBlog;
    },
    likeBlog: async (root, { _id, username }, { Blog, User }) => {
      const blog = await Blog.findOneAndUpdate({ _id }, { $inc: { likes: 1 } });
      const user = await User.findOneAndUpdate(
        { username },
        { $addToSet: { favorites: _id } }
      );
      return blog;
    },
    unlikeBlog: async (root, { _id, username }, { Blog, User }) => {
      const blog = await Blog.findOneAndUpdate(
        { _id },
        { $inc: { likes: -1 } }
      );
      const user = await User.findOneAndUpdate(
        { username },
        { $pull: { favorites: _id } }
      );
      return blog;
    },
    deleteUserBlog: async (root, { _id }, { Blog }) => {
      const blog = await Blog.findOneAndRemove({ _id });
      return blog;
    },
    updateUserBlog: async (
      root,
      { _id, title, imageUrl, category, description },
      { Blog }
    ) => {
      const updatedBlog = await Blog.findOneAndUpdate(
        { _id },
        { $set: { title, imageUrl, category, description } },
        { new: true }
      );
      return updatedBlog;
    },
    signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not found");
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }
      return { token: createToken(user, process.env.SECRET, "1hr") };
    },

    signupUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("User already exists");
      }
      const newUser = await new User({
        username,
        email,
        password
      }).save();
      return { token: createToken(newUser, process.env.SECRET, "1hr") };
    }
    // all mutation ends here
  }
};
