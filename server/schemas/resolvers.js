const { User, Job, Post } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const { generateToken } = require('../utils/tokenGen');

const resolvers = {
  Query: {
    // Fetch all users and populate their jobs
    User: async () => {
      const users = await User.find({}).populate('jobs');
      return users.map(user => ({
        ...user.toObject(),
        jobs: user.jobs || []
      }));
    },
    oneUser: async (parent, { user }) => {
      return User.findOne({ _id: user });
    },



    // Fetch all posts
    posts: async () => {
      return await Post.find({});
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    
    async login(parent, { username, password }, context) {
      const user = await authenticateUser(username, password);
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Generate a token and return it
      const token = generateToken(user);
      return { token };
    },
  
  

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },


  },
};

module.exports = resolvers;
