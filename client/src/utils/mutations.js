import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser(
    $userName: String!
    $password: String!
  ) {
    addUser(
      userName: $userName
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_REGIMENT_TO_USER = gql`
  mutation AddRegimentToUser($userId: ID!, $regimentId: ID!) {
    addRegimentToUser(userId: $userId, regimentId: $regimentId) {
      _id
      userName
      regiment {
        _id
        name
      }
    }
  }
`;

export const COMPLEATED_REGIMENT = gql`
  mutation AddCompletedRegiment($name: String!, $workouts: [WorkoutInput], $progressPic: String, $date: String, $time: Int) {
  addCompletedRegiment(name: $name, workouts: $workouts, progressPic: $progressPic, Date: $date, time: $time) {
    _id
    date
    name
    progressPic
    time
    workouts {
      name
    }
  }
}
`;

export const ADD_COMPLETED_REGIMENT_TO_USER = gql`
 mutation AddCompletedRegimentToUser($userId: ID!, $completedRegimentId: ID!) {
  addCompletedRegimentToUser(userId: $userId, CompletedRegimentId: $completedRegimentId) {
    _id
    CompletedRegiment {
      _id
      date
      name
      progressPic
      time
      workouts {
        name
        muscle
      }
    }
  }
}
`;

export const ADD_REGIMENT = gql`
  mutation AddRegiment($name: String!, $workouts: [WorkoutInput]) {
    addRegiment(name: $name, workouts: $workouts) {
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




export const ADD_POST = gql`
mutation AddPost($title: String!, $text: String!) {
  addPost(title: $title, text: $text) {
    _id
    title
    text
    user {
      _id
      userName
      pfp
    }
  }
}
`;



export const REMOVE_JOB = gql`
mutation RemoveJobFromUser($userId: ID!, $jobId: ID!) {
  removeJobFromUser(userId: $userId, jobId: $jobId) {
    user {
      _id
      userName
    }
    job {
      _id
      name
      description
      pay
    }
  }
}
`;

export const REMOVE_SKILL = gql`
mutation RemoveSkill($userId: ID!, $skill: String!) {
  removeSkill(UserId: $userId, skill: $skill) {
    _id
    userName
    skills
  }
}
`; 

export const SIGN_OUT = gql`
mutation SignOut {
  logout {
    success
    message
  }
}
`;

