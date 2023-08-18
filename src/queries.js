import { gql } from '@apollo/client';

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      tags
      priority
      createdAt
      completedAt
    }
  }
`;

const GET_COMPLETED_TASKS = gql`
  query GetCompletedTasks {
    completedTasks {
      id
      title
      tags
      priority
      createdAt
      completedAt
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

const GET_FILTERS = gql`
  query GetFilters {
    filters {
      storyPoints
    }
  }
`;

export {
  GET_TASKS,
  GET_COMPLETED_TASKS,
  CREATE_TASK,
  COMPLETE_TASK,
  UPDATE_TASK,
  GET_FILTERS,
};
