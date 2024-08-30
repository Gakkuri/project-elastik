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

const usersData = [
  {
    id: "1",
    first_name: "John",
    last_name: "Doe",
    email: "test@gmail.com",
    date_of_birth: "11/11/2000",
  },
  {
    id: "2",
    first_name: "Jane",
    last_name: "Doe",
    email: "test@gmail.com",
    date_of_birth: "10/10/2000",
  },
  {
    id: "3",
    first_name: "Someone",
    last_name: "Doe",
    email: "test@gmail.com",
    date_of_birth: "12/12/2000",
  },
];

const StudentList = () => {
  const [addModal, setAddModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  return (
    <CContainer fluid>
      <RemoveStudent
        student={selectedStudent}
        closeModal={() => setSelectedStudent(null)}
      />

      <AddStudent visible={addModal} closeModal={() => setAddModal(false)} />

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
          {usersData.map((student) => (
            <CTableRow key={student.first_name}>
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
