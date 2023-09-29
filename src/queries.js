import { gql } from '@apollo/client';

const TASK_FIELDS = gql`
  fragment TaskFields on Task {
    id
    title
    tags
    priority
    createdAt
    completedAt
  }
`;

const GET_TASKS = gql`
 ${TASK_FIELDS}
  query GetTasks {
    tasks {
      ...TaskFields
    }
  }
`;

const GET_COMPLETED_TASKS = gql`
  ${TASK_FIELDS}
  query GetCompletedTasks {
    completedTasks {
      ...TaskFields
    }
  }
`;

const CREATE_TASK = gql`
  ${TASK_FIELDS}
  mutation CreateTask($title: String!, $priority: Float!) {
    createTask(input: { title: $title, tags: [], priority: $priority }) {
      task {
        ...TaskFields
      }
    }
  }
`;

const COMPLETE_TASK = gql`
  ${TASK_FIELDS}
  mutation CompleteTask($id: ID!) {
    completeTask(input: { id: $id }) {
      task {
        ...TaskFields
      }
    }
  }
`;

const UPDATE_TASK = gql`
  ${TASK_FIELDS}
  mutation UpdateTask($id: ID!, $priority: Float, $tags: [String!]) {
    updateTask(input: { id: $id, priority: $priority, tags: $tags }) {
      task {
        ...TaskFields
      }
    }
  }
`;

const GET_FILTERS = gql`
  query GetFilters {
    filters {
      storyPoints
      onlyTickets
      project
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
