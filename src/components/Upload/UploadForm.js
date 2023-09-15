import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleUploadMedia, setInputs, uploadState } from "./reduxSlice";
import { authState } from "../Navbar/reduxSlice";
const Preview = () => {
  const { inputs } = useSelector(uploadState);
  return (
    inputs.path && (
      <div
        className="rounded p-1 m-5"
        style={{
          width: "22%",
          height: "280px",
          backgroundImage: `url(${inputs.path}`,
          backgroundSize: "cover",
        }}
      ></div>
    )
  );
};
function UploadForm({ isVisible }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(authState);
  const { inputs, loading } = useSelector(uploadState);
  const [uploadFileDemo, setUploadFileDemo] = React.useState(null);

  const handleOnChange = (e) => {
    if (e.target.name === "file") {
      const file = e.target.files[0];
      const path = URL.createObjectURL(file);
      setUploadFileDemo(file);
      dispatch(
        setInputs({
          ...inputs,
          file: file.name,
          path: path,
        })
      );
    } else {
      const title = e.target.value;
      dispatch(setInputs({ ...inputs, title: title }));
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!!currentUser) {
      const userName = currentUser?.displayName.split(" ").join("");
      const payload = { inputs, userName, uploadFileDemo };

      dispatch(handleUploadMedia(payload));
    } else {
      alert("please login !");
    }
  };
  const isDisabled = useMemo(() => {
    const areInputsEmpty = Object.values(inputs).some((input) => !input);
    return areInputsEmpty || !currentUser;
  }, [inputs, currentUser]);

  return (
    isVisible && (
      <div className="d-flex flex-column">
        <p className="display-6 text-center mb-3">Upload Stock Image</p>
        <div className="mb-5 d-flex align-items-center justify-content-center">
          <Preview />
          <form
            className=""
            style={{ textAlign: "left" }}
            onSubmit={handleOnSubmit}
          >
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="title"
                aria-describedby="text"
                onChange={handleOnChange}
              />
            </div>
            <div className="mb-3">
              <input
                accept="image/*"
                type="file"
                className="form-control"
                name="file"
                onChange={handleOnChange}
              />
            </div>
            {!currentUser && (
              <p style={{ color: "red" }}>⚠️ Please login to upload image!</p>
            )}
            {loading ? (
              <button
                className="btn btn-success float-end "
                type="button"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span role="status">Loading...</span>
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-success float-end"
                disabled={isDisabled}
              >
                Upload
              </button>
            )}
          </form>
        </div>
      </div>
    )
  );
}

export default UploadForm;
