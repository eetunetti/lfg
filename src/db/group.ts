import {
    ScalarAttributeType,
    KeyType,
    CreateTableCommandInput,
    PutItemCommandInput,
    GetItemCommandInput
} from '@aws-sdk/client-dynamodb';
import { createTable, put, get } from './dbOperations.ts'

const tableName = 'Groups';

const createProjectsTable = async () => {
    const params: CreateTableCommandInput = {
        AttributeDefinitions: [
            {
                AttributeName: "groupId",
                AttributeType: ScalarAttributeType.S
            },
        ],
        TableName: tableName,
        KeySchema: [
            {
                AttributeName: "groupId",
                KeyType: KeyType.HASH
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        }
    };
    return createTable(tableName, params);
}

const putProject = async (groupId: string, groupName: string, creationDate: Date, members: User[], admins: User[], description?: string) => {
    const params: PutItemCommandInput = {
        TableName: tableName,
        Item: {
            groupId: { S: groupId },
            name: { S: groupName },
            creationDate: { S: creationDate },
            content: {
                members:
        }
        }
    return put(tableName, params)
    };

    const getProject = async () => {
        const params: GetItemCommandInput = {
            TableName: tableName,
            Key: {
                userId: { S: '123' }
            }
        }
        return get(tableName, params);
    };


    const run = async () => {
        const tableReady = await createProjectsTable();
        if (!tableReady) {
            console.error("Table creation failed. Exiting");
            return;
        }
        await putProject();
        await getProject();
    }

    run();
