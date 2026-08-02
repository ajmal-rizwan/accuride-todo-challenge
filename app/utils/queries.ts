import { gql } from "graphql-request";

// export const GET_TODOS = gql`
//   query GetTodos($userId: String!) {
//     todos(where: { userId: $userId }) {
//       id
//       title
//       description
//       dueDate
//       completed
//     }
//   }
// `
export const GET_TODOS = gql`
  query GetTodos {
    todoLists {
      id
      title
      description
      dueDate
      completed
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    appUsers(where: { email: $email }) {
      id
      email
      password
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createAppUser(data: { email: $email, password: $password }) {
      id
      email
    }
  }
`;
