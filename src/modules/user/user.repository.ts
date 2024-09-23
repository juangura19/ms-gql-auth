
import { DynamoDBClient, GetItemCommand, PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

import { v4 as uuidv4 } from 'uuid';

const client = new DynamoDBClient({
    region: process.env.AWS_REGION ?? '',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
        sessionToken: process.env.AWS_SESSION_TOKEN ?? '',
    }
});

const TABLE_NAME = 'dev_user';

export const createUser = async (username: string, email: string, role: string, password: string) => {
    const id = uuidv4();
    const params = {
        TableName: TABLE_NAME,
        Item: marshall({
            id,
            username,
            email,
            role,
            password
        })
    };
    const command = new PutItemCommand(params);
    await client.send(command);

};

export const getUserById = async (id: string) => {
    const params = {
        TableName: TABLE_NAME,
        Key: marshall({
            id
        })
    };

    const command = new GetItemCommand(params);
    const result = await client.send(command);
    return result.Item ? unmarshall(result.Item) : null;
};

export const getUserByUsername = async (username: string) => {
    const params = {
        TableName: TABLE_NAME,
        IndexName: 'username-index',
        KeyConditionExpression: 'username = :username',
        ExpressionAttributeValues: marshall({
            ':username': username
        })
    };

    const command = new QueryCommand(params);
    const result = await client.send(command);
    return result.Items ? unmarshall(result.Items[0]) : null;

};
