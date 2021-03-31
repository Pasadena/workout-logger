import * as AWS from "aws-sdk";

const dynamoDB = process.env.IS_OFFLINE
  ? new AWS.DynamoDB.DocumentClient({
      region: "localhost",
      endpoint: "http://localhost:8000",
    })
  : new AWS.DynamoDB.DocumentClient();

export default dynamoDB;

export const byIdParameters = (tableName: string) => (id: string) => ({
  TableName: tableName,
  Key: {
    id,
  },
});

export const withItemParameters = (tableName: string) => (item: any) => ({
  TableName: tableName,
  Item: item,
});
