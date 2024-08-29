import { DynamoDB } from "aws-sdk";
import { Table } from "sst/node/table";
import Student from "./handler";

const dynamoDb = new DynamoDB.DocumentClient();

export default async function createStudent(
  student: Student
): Promise<Student> {
  const params = {
    Item: student as Record<string, string>,
    TableName: Table.Students.tableName,
  };

  await dynamoDb.put(params).promise();

  return student;
}
