import { DynamoDB } from "aws-sdk";
import { Table } from "sst/node/table";

const dynamoDb = new DynamoDB.DocumentClient();

export default async function listStudents(): Promise<
  Record<string, string>[] | undefined
> {
  const params = {
    TableName: Table.Students.tableName,
  };

  const data = await dynamoDb.scan(params).promise();

  return data.Items;
}
