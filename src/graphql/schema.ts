import { mergeTypeDefs } from '@graphql-tools/merge';
import userSchema from '../modules/user/user.schema';

const schema = mergeTypeDefs([ userSchema]);

export const typeDefs = mergeTypeDefs(schema);