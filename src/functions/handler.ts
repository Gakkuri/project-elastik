import listStudents from "./listStudents";
import createStudent from "./createStudent";
import deleteStudent from "./deleteStudent";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    student: Student;
    studentId: string;
  };
};

export type Student = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
};

export async function handler(
  event: AppSyncEvent
): Promise<Record<string, unknown>[] | Student | string | null | undefined> {
  switch (event.info.fieldName) {
    case "listStudents":
      return await listStudents();
    case "createStudent":
      return await createStudent(event.arguments.student);
    case "deleteStudent":
      return await deleteStudent(event.arguments.studentId);
    default:
      return null;
  }
}
