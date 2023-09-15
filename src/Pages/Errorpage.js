import React from "react";
import { useNavigate } from "react-router-dom";

function Errorpage() {
  const navigate = useNavigate();
  return (
    <>
      <button
        className="btn  mb-5"
        onClick={() => {
          navigate("/");
        }}
      >
        ⬅️ Back
      </button>
      <div className="d-flex flex-column justify-content-center align-items-center gap-2">
        <h1 className="text-warning">
          Error 404 <br />
          Page not found
        </h1>
        <h4>🙄 Seems like you are lost?</h4>
      </div>
    </>
  );
}

export default Errorpage;
