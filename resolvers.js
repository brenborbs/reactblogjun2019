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
