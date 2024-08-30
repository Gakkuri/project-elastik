"use client";

import { useState } from "react";
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
  CSpinner,
} from "@coreui/react";

import { useRouter } from "next/navigation";
import { signIn } from "aws-amplify/auth";

import style from "./Login.module.css";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    setLoading(true);

    try {
      await signIn({
        username: data.get("username") as string,
        password: data.get("password") as string,
      });
      router.push("/students");
    } catch (error) {
      console.log("error signing in", error);
    } finally {
      setLoading(false);
    }
  };

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
                <CForm onSubmit={onSubmit}>
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

                    <CButton color="primary" type="submit" disabled={loading}>
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
                        "Login"
                      )}
                    </CButton>
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
