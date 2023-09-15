import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "./Card";
import { useSelector } from "react-redux";
import { uploadState } from "./Upload/reduxSlice";

const Image = () => {
  const navigate = useNavigate();
  const { items } = useSelector(uploadState);
  const { state } = useLocation();
  const item = items.find((item) => item.id === state.id);
  //   debugger;

  return (
    <div>
      <button
        className="btn btn-outline-primary mb-5"
        onClick={() => {
          navigate(-1);
        }}
      >
        ⬅️ back
      </button>
      <div className="d-flex justify-content-center mb-5">
        <Card {...item} />
      </div>
    </div>
  );
};

export default Image;
