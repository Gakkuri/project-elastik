"use client";

import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from "@coreui/react";

import { Student } from "@/types/types";

const RemoveStudent = ({
  student,
  closeModal,
}: {
  student: Student | null;
  closeModal: () => void;
}) => {
  const onRemoveStudent = () => {
    // Remove student
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
        <CButton color="secondary" onClick={closeModal}>
          Close
        </CButton>
        <CButton color="danger" onClick={onRemoveStudent}>
          Remove
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
export default RemoveStudent;
