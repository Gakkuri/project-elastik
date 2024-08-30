"use client";

import { useState } from "react";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CSpinner,
} from "@coreui/react";
import { deleteStudent } from "@/graphql/mutations";
import { generateClient } from "aws-amplify/api";

import { Student } from "@/types/types";

const client = generateClient();

const RemoveStudent = ({
  student,
  closeModal,
}: {
  student: Student | null;
  closeModal: (id?: string) => void;
}) => {
  const [loading, setLoading] = useState(false);

  const onRemoveStudent = async () => {
    // Remove student
    try {
      const { data } = (await client.graphql({
        query: deleteStudent,
        variables: {
          studentId: student?.id,
        },
      })) as { data: { deleteStudent: string } };
      setLoading(false);
      closeModal(data.deleteStudent);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <CModal visible={!!student}>
      <CModalHeader>
        <CModalTitle>Removing Student!</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>{`Are you sure you want to remove "${student?.first_name || ""} ${
          student?.last_name || ""
        }"?`}</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => closeModal()}>
          Close
        </CButton>
        <CButton color="danger" onClick={onRemoveStudent}>
          {loading ? (
            <>
              <CSpinner as="span" size="sm" variant="grow" aria-hidden="true" />
              Loading...
            </>
          ) : (
            "Remove"
          )}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
export default RemoveStudent;
