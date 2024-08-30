"use client";

import {
  CButton,
  CForm,
  CFormInput,
  CCard,
  CCardBody,
  CCardTitle,
  CContainer,
  CRow,
  CCol,
  CCardSubtitle,
} from "@coreui/react";

import style from "./Login.module.css";

const Login = () => {
  return (
    <CContainer fluid>
      <CRow
        className={`${style.containerHeight} justify-content-center align-items-center`}
      >
        <CCol className="col-md-4">
          <CCard className="text-center">
            <CCardBody>
              <CRow xs={{ gutterY: 3 }}>
                <CCardTitle>Elastik</CCardTitle>
                <CCardSubtitle>Login</CCardSubtitle>
                <CForm>
                  <CRow xs={{ gutterY: 3 }}>
                    <CFormInput
                      id="username"
                      name="username"
                      placeholder="Username"
                    />
                    <CFormInput
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                    />

                    <CButton color="primary">Login</CButton>
                  </CRow>
                </CForm>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};
export default Login;
