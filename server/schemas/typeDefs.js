const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    userName: String
    pfp: String
    password: String
    regiment: [Regiment]
    CompletedRegiment: [CompletedRegiment]
  }

  type Workout {
    name: String
    instructions: String
    type: String
    muscle: String
    difficulty: String
    equipment: String
  }

  type Regiment {
  _id: ID
  name: String
  workouts: [Workout]
  }

  type CompletedRegiment {
  _id: ID
  name: String
  workouts: [Workout]
  progressPic: String
  date: String
  time: Int
  }

input WorkoutInput {
    name: String
    instructions: String
    type: String
    muscle: String
    difficulty: String
    equipment: String
}

type Auth {
  token: ID
  user: User
}

  type Query {
    User: User!
    oneUser(user: ID!): User

    userRegiments(userId: ID!): [Regiment]
    Regiment(regiment: ID!): Regiment
    

    
  }


  type Mutation {
    addUser(userName: String!, password: String!): Auth
    addRegimentToUser(userId: ID!, regimentId: ID!): User
    addRegiment(name: String!, workouts: [WorkoutInput]): Regiment
    addCompletedRegimentToUser(userId: ID!, CompletedRegimentId: ID!): User
    addCompletedRegiment(name: String!, workouts: [WorkoutInput], progressPic: String, Date: String, time: Int): CompletedRegiment
    removeRegimentFromUser(userId: ID!, regimentId: ID!): User
    login(userName: String!, password: String!): Auth
}
`;

module.exports = typeDefs;
