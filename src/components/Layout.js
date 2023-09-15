import React from "react";
import Navbar, { SearchForm } from "./Navbar/Navbar";
import UploadForm from "./Upload/UploadForm";
import { useDispatch, useSelector } from "react-redux";
import { setCollaped, setInputs, uploadState } from "./Upload/reduxSlice";

function Layout({ children }) {
  const { isCollapsed } = useSelector(uploadState);
  const dispatch = useDispatch();
  const toggle = (bool) => dispatch(setCollaped({ bool: !isCollapsed }));
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="d-flex justify-content-center align-items-center">
          <div className="d-flex d-md-none justify-content-center align-items-center">
            <SearchForm />
          </div>
          <button
            className={`btn ${
              isCollapsed ? "btn-success " : "btn-warning"
            } ms-md-auto`}
            onClick={() => {
              toggle(!isCollapsed);
              dispatch(
                setInputs({
                  title: null,
                  file: null,
                  path: null,
                })
              );
            }}
          >
            {isCollapsed ? "+ Add" : "Close"}
          </button>
        </div>
        <div className="space-fixed mb-4"></div>
        <UploadForm isVisible={!isCollapsed} />
        {children}
      </div>
    </>
  );
}

export default Layout;
