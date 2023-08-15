import { gql } from '@apollo/client';

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      tags
      priority
    }
  }
`;

const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $priority: Float!) {
    createTask(input: { title: $title, tags: [], priority: $priority }) {
      task {
        id
        title
        tags
        priority
      }
    }
  }
`;

const COMPLETE_TASK = gql`
  mutation CompleteTask($id: ID!) {
    completeTask(input: { id: $id }) {
      task {
        id
        title
        tags
        priority
      }
    }
  }
`;

const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $priority: Float, $tags: [String!]) {
    updateTask(input: { id: $id, priority: $priority, tags: $tags }) {
      task {
        id
        title
        tags
        priority
      }
    }
  }
`;

export {
  GET_TASKS,
  CREATE_TASK,
  COMPLETE_TASK,
  UPDATE_TASK,
};
