"use client";
import React, { useState } from "react";
import {
  CContainer,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
} from "@coreui/react";

import RemoveStudent from "@/components/Modals/RemoveStudent";
import AddStudent from "@/components/Modals/AddStudent";
import { Student } from "@/types/types";

import styles from "./StudentList.module.css";

const StudentList = ({ students }: { students: Student[] }) => {
  const [addModal, setAddModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [displayStudents, setDisplayStudents] = useState<Student[]>(students);

  return (
    <CContainer fluid>
      <RemoveStudent
        student={selectedStudent}
        closeModal={(id) => {
          setDisplayStudents((curr) =>
            curr.filter((student) => student.id !== id)
          );
          setSelectedStudent(null);
        }}
      />
      <AddStudent
        visible={addModal}
        closeModal={(student) => {
          if (student)
            setDisplayStudents([...displayStudents, student as Student]);
          setAddModal(false);
        }}
      />

      <div className={styles.createStudentBtn}>
        <CButton
          color="primary"
          shape="rounded-pill"
          onClick={() => setAddModal(true)}
        >
          Create Student
        </CButton>
      </div>

      <CTable striped align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date of Birth</CTableHeaderCell>
            <CTableHeaderCell
              className={styles.removeCol}
              scope="col"
            ></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {displayStudents.map((student) => (
            <CTableRow key={student.id}>
              <CTableDataCell>{student.first_name}</CTableDataCell>
              <CTableDataCell>{student.last_name}</CTableDataCell>
              <CTableDataCell>{student.email}</CTableDataCell>
              <CTableDataCell>{student.date_of_birth}</CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="danger"
                  shape="rounded-pill"
                  size="sm"
                  onClick={() => setSelectedStudent(student)}
                >
                  Remove
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CContainer>
  );
};

export default StudentList;
