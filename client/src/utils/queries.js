import { gql } from "@apollo/client";



export const GET_REGIMENTS = gql`
  query UserRegiments($userId: ID!) {
    userRegiments(userId: $userId) {
      _id
      name
      workouts {
        instructions
        type
        muscle
        difficulty
        equipment
      }
    }
  }
`;


export const REGIMENT = gql`
  query Regiment($regiment: ID!) {
    Regiment(regiment: $regiment) {
      _id
      name
      workouts {
        instructions
        type
        muscle
        difficulty
        equipment
      }
    }
  }
`;

export const GET_JOB = gql`
query User {
  User {
    _id
    userName
  }
}
  query Job {
  Job {
    _id
    name
    description
    pay
  }
}
`;

export const QUERY_ONE_JOB = gql`
  query OneJob($jobId: ID!) {
  OneJob(jobId: $jobId) {
    _id
    name
    description
    pay
  }
}
`;

export const GET_ALL_USERS = gql`
query GetAllUsers {
  users {
    _id
    userName
    password
  }
}
`;

export const GET_USER_BY_ID = gql`
query GetUserById($userId: ID!) {
  user(id: $userId) {
    _id
    userName
    skills
    jobs {
      _id
      name
      description
      pay
    }
  }
}
`;


