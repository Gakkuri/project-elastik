"use client";

import { useState } from "react";
import {
  CContainer,
  CRow,
  CCol,
  CAvatar,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CSpinner,
} from "@coreui/react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { signOut } from "aws-amplify/auth";

import styles from "./Header.module.css";

const Header = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onLogout = async () => {
    setLoading(true);
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.log("error signing out: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CContainer fluid className={styles.header}>
      <CRow className={`justify-content-between align-items-center`}>
        <CCol xs={4}>
          <h1 className={styles.headerTitle}>Elastik</h1>
        </CCol>
        <CCol xs={1} className={styles.avatarContainer}>
          <CDropdown>
            <CDropdownToggle size="sm">
              <CAvatar color="primary" textColor="white">
                {loading ? <CSpinner size="sm" /> : "T"}
              </CAvatar>
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem onClick={onLogout}>Logout</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CCol>
      </CRow>
    </CContainer>
  );
};
export default Header;
