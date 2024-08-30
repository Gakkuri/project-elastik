"use client";

import { useState } from "react";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
  CRow,
  CSpinner,
} from "@coreui/react";
import { createStudent } from "@/graphql/mutations";
import { generateClient } from "aws-amplify/api";

import { Student } from "@/types/types";

const client = generateClient();

const AddStudent = ({
  visible,
  closeModal,
}: {
  visible: boolean;
  closeModal: (student?: Student) => void;
}) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Add student
    e.preventDefault();
    const values = new FormData(e.currentTarget);

    setLoading(true);

    try {
      const { data } = (await client.graphql({
        query: createStudent,
        variables: {
          input: {
            first_name: values.get("first_name"),
            last_name: values.get("last_name"),
            email: values.get("email"),
            date_of_birth: values.get("date_of_birth"),
          },
        },
      })) as { data: { createStudent: Student } };
      setLoading(false);
      closeModal(data.createStudent);
    } catch (error) {
      setLoading(false);
    }
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
          <CButton color="secondary" onClick={() => closeModal()}>
            Close
          </CButton>
          <CButton type="submit" color="primary" disabled={loading}>
            {loading ? (
              <>
                <CSpinner
                  as="span"
                  size="sm"
                  variant="grow"
                  aria-hidden="true"
                />
                Loading...
              </>
            ) : (
              "Add Student"
            )}
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  );
};
export default AddStudent;
