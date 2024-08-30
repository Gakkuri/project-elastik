import { DynamoDB } from "aws-sdk";
import { Table } from "sst/node/table";

const dynamoDb = new DynamoDB.DocumentClient();

export default async function deleteStudent(
  studentId: string
): Promise<string> {
  const params = {
    Key: { id: studentId },
    TableName: Table.Students.tableName,
  };

  await dynamoDb.delete(params).promise();

  return studentId;
}
