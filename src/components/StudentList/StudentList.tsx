"use client";
import React from "react";
import {
  CContainer,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CRow,
  CCol,
} from "@coreui/react";

import styles from "./StudentList.module.css";

const usersData = [
  {
    first_name: "John",
    last_name: "Doe",
    email: "test@gmail.com",
    date_of_birth: "11/11/2000",
  },
  {
    first_name: "Jane",
    last_name: "Doe",
    email: "test@gmail.com",
    date_of_birth: "10/10/2000",
  },
  {
    first_name: "Someone",
    last_name: "Doe",
    email: "test@gmail.com",
    date_of_birth: "12/12/2000",
  },
];

const StudentList = () => {
  const onRemoveStudent = () => {};

  return (
    <CContainer fluid>
      <div className={styles.createStudentBtn}>
        <CButton color="primary" shape="rounded-pill" onClick={onRemoveStudent}>
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
          {usersData.map((user) => (
            <CTableRow key={user.first_name}>
              <CTableDataCell>{user.first_name}</CTableDataCell>
              <CTableDataCell>{user.last_name}</CTableDataCell>
              <CTableDataCell>{user.email}</CTableDataCell>
              <CTableDataCell>{user.date_of_birth}</CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="danger"
                  shape="rounded-pill"
                  size="sm"
                  onClick={onRemoveStudent}
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
