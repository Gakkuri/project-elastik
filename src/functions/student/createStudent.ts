import { DynamoDB } from "aws-sdk";
import { Table } from "sst/node/table";
import { Student } from "./handler";
import { ulid } from "ulidx";

const dynamoDb = new DynamoDB.DocumentClient();

export default async function createStudent(
  student: Student
): Promise<Student> {
  const studentId = ulid();
  const newStudent = { ...student, id: studentId };
  const params = {
    Item: newStudent as Record<string, string>,
    TableName: Table.Students.tableName,
  };

  await dynamoDb.put(params).promise();

  return newStudent;
}
