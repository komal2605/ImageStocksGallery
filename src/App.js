import { Route, Routes } from "react-router-dom";
import "./App.css";
import Root from "./Routes/Root";
import Layout from "./components/Layout";
import { useDispatch } from "react-redux";
import React from "react";
import { fetchData } from "./components/Upload/reduxSlice";
import { getAuthenticatedAsync } from "./components/Navbar/reduxSlice";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchData());
    dispatch(getAuthenticatedAsync());
    // eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <Routes>
        <Route path="*" element={<Root />} />
      </Routes>
    </Layout>
  );
}

export default App;
