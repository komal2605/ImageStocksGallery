import React from "react";
import { useSelector } from "react-redux";
import { authState } from "./Navbar/reduxSlice";

const Profile = () => {
  const { currentUser } = useSelector(authState);
  return (
    <>
      {currentUser ? (
        <>
          <h1 className="text-center">Profile</h1>
          <hr style={{ width: "50%", margin: "3rem auto" }} />
          <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-4 gap-sm-2">
            <img
              src={currentUser?.photoURL}
              alt={currentUser?.displayName}
              style={{ borderRadius: 4 }}
              width={110}
              height={110}
            />
            <ul className="list-group mx-5">
              <li className="list-group-item border border-0 d-flex justify-content-center justify-content-sm-start align-items-center gap-1">
                <span className="fs-5 text-capitalize">👤 </span>
                {currentUser?.displayName}
              </li>
              <li className="list-group-item border border-0 d-flex justify-content-center justify-content-sm-start align-items-center gap-1">
                <span className="fs-5 text-capitalize">✉️ </span>
                {currentUser?.email}
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div className="d-flex mt-5">
          <h2 className="m-auto">You are not Logged In 😏</h2>
        </div>
      )}
    </>
  );
};

export default Profile;
