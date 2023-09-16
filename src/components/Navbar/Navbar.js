import { useDispatch, useSelector } from "react-redux";
import { authState, logInAsync, setCurrentUser } from "./reduxSlice";
import FirebaseAuth from "../../handlers/auth";
import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { setItems, uploadState } from "../Upload/reduxSlice";
import GoogleIcon from "./GoogleIcon";

const AuthContainer = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(authState);
  const { signOut } = FirebaseAuth;
  const login = () => dispatch(logInAsync());
  const logout = () => signOut().then(() => dispatch(setCurrentUser(null)));
  return (
    <div className="d-flex justify-content-center">
      {!currentUser ? (
        <button
          type="button"
          className="btn text-nowrap btn-outline-primary"
          onClick={login}
        >
          <GoogleIcon /> Login with Google
        </button>
      ) : (
        <button type="button" className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      )}
    </div>
  );
};

const Navigation = () => {
  const location = useLocation();
  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link
          className={`nav-link ${location.pathname === "/" ? "active" : " "}`}
          aria-current="page"
          to={"/"}
        >
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link ${
            location.pathname === "my-stocks" ? "active" : " "
          }`}
          aria-current="page"
          to={"/my-stocks"}
        >
          My Stocks
        </Link>
      </li>
    </ul>
  );
};

export const SearchForm = () => {
  const { dbData } = useSelector(uploadState);
  const [string, setString] = React.useState(null);
  const dispatch = useDispatch();
  const searchFilter = (searchString) => {
    if (searchString === "" || !searchString) {
      dispatch(setItems({ items: dbData, data: dbData }));
    } else {
      const filteredItems = dbData.filter((item) => {
        const name = item.title.toLowerCase();
        const search = searchString.toLowerCase();
        return name.indexOf(search) > -1;
      });
      dispatch(setItems({ items: filteredItems, data: dbData }));
    }
  };
  const handleChange = (e) => {
    setString(e.target.value);
    searchFilter(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    searchFilter(string);
  };
  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        className="form-control me-2"
        type="search"
        placeholder="🔍 search by title..."
        aria-label="Search"
      />
      {/* <button className="btn btn-outline-success" type="submit">
        Search
      </button> */}
    </form>
  );
};

const Dropdown = () => {
  const { currentUser } = useSelector(authState);
  const userName = useMemo(() => {
    return currentUser ? `👋 ${currentUser?.displayName}` : "Profile";
  }, [currentUser]);
  const avatar = useMemo(() => {
    return !!currentUser ? (
      <img
        src={currentUser.photoURL}
        alt="profile"
        width={35}
        height={35}
        style={{ borderRadius: 50 }}
        className="avatar"
      />
    ) : (
      " Login"
    );
  }, [currentUser]);
  return (
    <ul className="navbar-nav ">
      <li className="nav-item dropdown ">
        <a
          className="nav-link dropdown-toggle"
          href="/"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {avatar}
        </a>
        <ul
          className="dropdown-menu"
          style={{
            right: 0,
            left: "auto",
            border: "0.5px solid #eee",
            position: "absolute",
          }}
          aria-labelledby="navbarDropdown"
        >
          <li className="">
            <Link className="dropdown-item text-center" to={"/profile"}>
              {userName}
            </Link>
          </li>
          <li>
            <hr className="dropdown divider" />
          </li>
          <AuthContainer />
        </ul>
      </li>
    </ul>
  );
};

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-light py-2">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            🖼️ Gallerystock
          </a>
          <div className="d-flex d-md-none ms-auto me-3">
            <Dropdown />
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{
              boxShadow: "none",
              border: 0,
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Navigation />
            <div className="d-none d-md-flex ">
              <SearchForm />
              <Dropdown />
            </div>
          </div>
        </div>
      </nav>
      {/* {
        <div className="d-flex d-md-none justify-content-center align-items-center mt-3">
          <SearchForm />
        </div>
      } */}
    </>
  );
};
export default Navbar;
