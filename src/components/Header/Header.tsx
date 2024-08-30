"use client";

import { CContainer, CRow, CCol, CAvatar, CButton } from "@coreui/react";
import styles from "./Header.module.css";

const Header = () => {
  const onLogout = () => {};

  return (
    <CContainer fluid className={styles.header}>
      <CRow className={`justify-content-between align-items-center`}>
        <CCol xs={4}>
          <h1 className={styles.headerTitle}>Elastik</h1>
        </CCol>
        <CCol xs={1} className={styles.avatarContainer}>
          <CAvatar color="primary" textColor="white">
            CLS
          </CAvatar>
        </CCol>
      </CRow>
    </CContainer>
  );
};
export default Header;
