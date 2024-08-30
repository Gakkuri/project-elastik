export const createStudent = `mutation createStudent($input: StudentInput!) {
  createStudent(student: $input) {
    id
    first_name
    last_name
    email
    date_of_birth
  }
}`;

export const deleteStudent = `mutation deleteStudent($studentId: String!) {
  deleteStudent(studentId: $studentId)
}`;
