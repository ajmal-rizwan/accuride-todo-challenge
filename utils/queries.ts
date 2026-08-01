import { gql } from 'graphql-request'

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
`