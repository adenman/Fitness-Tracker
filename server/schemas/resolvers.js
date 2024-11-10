const { User, Regiment } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const { generateToken } = require('../utils/tokenGen');
const Auth = require('../utils/auth');

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

    Regiment: async (parent, { regiment }) => {
      return Regiment.findOne({ _id: regiment });
    },



    // Fetch all Regiments
    userRegiments: async (parent, { userId }) => {
      const user = await User.findById(userId).populate('regiments');
      return user.regiments;
    },
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

    addRegiment: async (parent, { name, workouts  }) => {
      

      const regiment = await Regiment.create({
        name, workouts
      });

      return regiment;
    },

    addRegimentToUser: async (parent, { userId, regimentId }) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { regiments: regimentId } }, 
          { new: true }
        ).populate('regiments');
    
        if (!updatedUser) {
          throw new Error('User not found');
        }
    
        return updatedUser;
      } catch (error) {
        throw new Error(`Failed to add regiment: ${error.message}`);
      }
    }


  },
};

module.exports = resolvers;
