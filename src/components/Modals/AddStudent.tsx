"use client";

import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
  CCol,
  CRow,
} from "@coreui/react";

import { Student } from "@/types/types";

const AddStudent = ({
  visible,
  closeModal,
}: {
  visible: boolean;
  closeModal: () => void;
}) => {
  const onSubmit = (e) => {
    // Add student
    e.preventDefault();
    const values = new FormData(e.target);

    values.forEach((key, value) => {
      console.log(key, value);
    });
  };

  return (
    <CModal visible={visible}>
      <CForm onSubmit={onSubmit}>
        <CModalHeader>
          <CModalTitle>Add Student</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow xs={{ gutterY: 3 }}>
            <div>
              <CFormInput
                id="first_name"
                name="first_name"
                label="First Name"
                placeholder="John"
              />
            </div>
            <div>
              <CFormInput
                id="last_name"
                name="last_name"
                label="Last Name"
                placeholder="Doe"
              />
            </div>
            <div>
              <CFormInput
                type="email"
                id="email"
                name="email"
                label="Email address"
                placeholder="name@example.com"
              />
            </div>
            <div>
              <CFormInput
                type="date"
                name="date_of_birth"
                id="date_of_birth"
                label="Date of Birth"
              />
            </div>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={closeModal}>
            Close
          </CButton>
          <CButton type="submit" color="primary">
            Add Student
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  );
};
export default AddStudent;
