import { gql } from 'apollo-server-express';

const userSchema = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
  }

  type AuthPayload {
    token: String
  }

  type Query {
    me: User
  }

  type Mutation {
    signUp(username: String!, email: String!, role:String!, password: String!): AuthPayload
    login(username: String!, password: String!): AuthPayload
  }
`;

export default userSchema;