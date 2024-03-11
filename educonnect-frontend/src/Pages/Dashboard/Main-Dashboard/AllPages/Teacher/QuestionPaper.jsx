import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import axios from "axios";

function QuestionPaper() {
  const { data } = useSelector((store) => store.auth);
  const {
    data: { user },
  } = useSelector((state) => state.auth);

  const disptach = useDispatch();

  if (data?.isAuthenticated === false) {
    return <Navigate to={"/"} />;
  }

  if (user.userType !== "teacher") {
    return <Navigate to={"/dashboard"} />;
  }
  return (
    <>
      <ToastContainer />
      <div className="container">
        <Sidebar/>
        <div className="AfterSideBar">
          <div className="mainAmbupance">
            <h1>Upload Question Paper</h1>
            <form
            //  onSubmit={handleSubmit}
             >
              <div>
                <label>Select Teacher</label>
                <div className="inputdiv">
                  
                </div>
              </div>
              
              <button
                type="button"
                // onClick={handleAddField}
                className="addButton"
              >
                Add
              </button>
              <button
                type="button"
                // onClick={handleDeleteField}
                className="addButton"
              >
                Delete
              </button>
              <button type="submit" className="formsubmitbutton">
                {/* {loading ? "Loading..." : "Submit"} */}
              </button>
            </form>
          </div>
        </div>
        <div className="AfterSideBar">
          <div className="mainAmbupance">
            <h1>Upload Student Score</h1>
            <form
            //  onSubmit={handleSubmit}
             >
              <div>
                <label>Select Teacher</label>
                <div className="inputdiv">
                  
                </div>
              </div>
              
              <button
                type="button"
                // onClick={handleAddField}
                className="addButton"
              >
                Add
              </button>
              <button
                type="button"
                // onClick={handleDeleteField}
                className="addButton"
              >
                Delete
              </button>
              <button type="submit" className="formsubmitbutton">
                {/* {loading ? "Loading..." : "Submit"} */}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuestionPaper;
