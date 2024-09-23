import { generateToken } from "../../common/utils/tokenUtils";
import { createUser, getUserByUsername } from "./user.repository";
import bcrypt from 'bcrypt';

const resolvers = {
    Mutation: {
        login: async (parent: any, args: { username: string, password: string }) => {
            const user = await getUserByUsername(args.username);
            console.log(user)
            if (!user) {
                throw new Error('User not found');
            }

            const isMatch = await bcrypt.compare(args.password, user.password);
            if (!isMatch) {
                throw new Error('Invalid credentials');
            }

            const token = generateToken({ user: user.username, role: user.role });

            return {
                token
            };
        },
        signUp: async (parent: any, args: { username: string, email: string, role: string, password: string }) => {
            const hashedPassword = await bcrypt.hash(args.password, 10);

            await createUser(args.username, args.email, args.role, hashedPassword);

            const token = generateToken({ user: args.username, role: args.role });
            return { token }
        }
    }
};

export const userResolver = resolvers;
