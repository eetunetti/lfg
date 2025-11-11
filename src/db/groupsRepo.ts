import {
    ScalarAttributeType,
    KeyType,
    type CreateTableCommandInput,
    type PutItemCommandInput,
    type GetItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { createTable, put, get } from './dbOperations';
import { CreateGroupInput, Group } from './types';

const tableName = 'Groups';

export const ensureGroupsTable = async (): Promise<boolean> => {
    const params: CreateTableCommandInput = {
        AttributeDefinitions: [
            { AttributeName: 'groupId', AttributeType: ScalarAttributeType.S },
        ],
        TableName: tableName,
        KeySchema: [
            { AttributeName: 'groupId', KeyType: KeyType.HASH },
        ],
        ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
    };
    return createTable(tableName, params);
};

export const createGroup = async (input: CreateGroupInput): Promise<Group> => {
    const group: Group = {
        groupId: crypto.randomUUID(),
        name: input.name,
        description: input.description,
        creationDateIso: new Date().toISOString(),
        creatorUserId: input.creatorUserId,
        adminUserIds: [input.creatorUserId],
        memberUserIds: [input.creatorUserId],
        roles: [],
    };

    const params: PutItemCommandInput = {
        TableName: tableName,
        Item: {
            groupId: { S: group.groupId },
            name: { S: group.name },
            creationDateIso: { S: group.creationDateIso },
            creatorUserId: { S: group.creatorUserId },
            adminUserIds: { L: group.adminUserIds.map((u) => ({ S: u })) },
            memberUserIds: { L: group.memberUserIds.map((u) => ({ S: u })) },
            ...(group.description ? { description: { S: group.description } } : {}),
        },
    };

    await put(tableName, params);
    return group;
};

export const getGroupById = async (groupId: string) => {
    const params: GetItemCommandInput = {
        TableName: tableName,
        Key: {
            groupId: { S: groupId },
        },
    };
    return get(tableName, params);
};

