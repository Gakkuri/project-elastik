import { CSpinner, CRow } from "@coreui/react";

const Loading = () => {
  return (
    <CRow className="justify-content-center">
      <CSpinner variant="grow" style={{ width: "4rem", height: "4rem" }} />;
    </CRow>
  );
};
export default Loading;
