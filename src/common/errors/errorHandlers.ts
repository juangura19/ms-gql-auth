import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { AppGraphQLError } from './errorTypes';
import { logError } from '../utils/logger';

export const formatError = (error: GraphQLError): GraphQLFormattedError => {
  if (error.originalError instanceof AppGraphQLError) {
    const customError = error.originalError as AppGraphQLError;
    return {
      message: customError.message,
      extensions: {
        code: customError.type
      }
    };
  }
  return {
    message: error.message,
    extensions: {
      code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
    }
  };
};
