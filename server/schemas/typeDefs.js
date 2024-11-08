const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    userName: String
    pfp: String
    password: String
    regiment: [Regiment]
  }

  type Workout {
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

    Regiments: [Regiment]!
    Regiment(regiment: ID!): Regiment
    

    
  }


  type Mutation {
    addUser(userName: String!, password: String!): Auth
    addRegimentToUser(userId: ID!, regimentId: ID!): User
    addRegiment(name: String!, workouts: [WorkoutInput]): Regiment
    removeRegimentFromUser(userId: ID!, regimentId: ID!): User
    login(userName: String!, password: String!): Auth
}
`;

module.exports = typeDefs;
