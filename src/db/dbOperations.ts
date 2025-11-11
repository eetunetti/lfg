import {
    DynamoDBClient,
    PutItemCommand,
    GetItemCommand,
    CreateTableCommand,
    DescribeTableCommand,
    ResourceNotFoundException,
    type CreateTableCommandInput,
    type PutItemCommandInput,
    type GetItemCommandInput,
} from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({
    region: process.env.AWS_REGION ?? 'eu-west-1',
    endpoint: process.env.DYNAMODB_ENDPOINT ?? 'http://localhost:8000',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? 'fake',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? 'fake',
    },
});

export const createTable = async (tableName: string, params: CreateTableCommandInput) => {
    try {
        await client.send(new DescribeTableCommand({ TableName: tableName }));
        console.log(`Table "${tableName}" already exists`);
    }
    catch (err) {
        if (ResourceNotFoundException.isInstance(err)) {
            console.log(`Table "${tableName}" does not exist. Creating table...`);

            try {
                const createResponse = await client.send(new CreateTableCommand(params));
                console.log("Table creation initiated. Details: ", createResponse);
            } catch (createErr) {
                console.error("Error creating table: ", createErr);
                return false;
            }
        } else {
            console.error("Error describing table: ", err);
            return false;
        }
    }
    return true;
};

export const put = async (tableName: string, params: PutItemCommandInput) => {
    try {
        if (!params.TableName) params.TableName = tableName;
        const data = await client.send(new PutItemCommand(params));
        console.log('PutItem succeeded: ', data);
    } catch (err) {
        console.error('Error putting item: ', err);
    }
};

export const get = async (tableName: string, params: GetItemCommandInput) => {
    try {
        if (!params.TableName) params.TableName = tableName;
        const data = await client.send(new GetItemCommand(params));
        if (data.Item) {
            console.log('GetItem succeeded: ', data.Item);
        } else {
            console.log('No item found with the provided key');
        }
    } catch (err) {
        console.error('Error getting item: ', err);
    }
}
