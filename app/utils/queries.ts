import { gql } from "graphql-request";

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createAppUser(data: { email: $email, password: $password }) {
      id
      email
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

export const GET_TODOS_BY_USER = gql`
  query GetTodosByUser($userId: String!) {
    todoLists(where: { userId: $userId }) {
      id
      title
      description
      dueDate
      completed
      userId
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo(
    $title: String!
    $description: String
    $dueDate: Date
    $userId: String!
  ) {
    createTodoList(
      data: {
        title: $title
        description: $description
        dueDate: $dueDate
        completed: false
        userId: $userId
      }
    ) {
      id
      title
      description
      dueDate
      completed
      userId
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo(
    $id: ID!
    $title: String!
    $description: String
    $dueDate: Date
  ) {
    updateTodoList(
      where: { id: $id }
      data: { title: $title, description: $description, dueDate: $dueDate }
    ) {
      id
      title
      description
      dueDate
      completed
      userId
    }
  }
`;

export const UPDATE_TODO_STATUS = gql`
  mutation UpdateTodoStatus($id: ID!, $completed: Boolean!) {
    updateTodoList(where: { id: $id }, data: { completed: $completed }) {
      id
      completed
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodoList(where: { id: $id }) {
      id
    }
  }
`;
