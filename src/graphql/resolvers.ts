import { mergeResolvers } from '@graphql-tools/merge';
import { userResolver } from '../modules/user/user.resolver';

const resolver = [userResolver];
export const resolvers = mergeResolvers(resolver);