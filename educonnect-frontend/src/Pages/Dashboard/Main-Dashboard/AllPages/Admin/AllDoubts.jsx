import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { deleteDoubt, GetDoubts } from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";

const Beds_Rooms = () => {
  const data = useSelector((store) => store.auth);

  const [showSolve,setShowSolve] = useState(false);

  const dispatch = useDispatch();

  const beds = useSelector((state) => state.data.doubts);
  console.log(beds)
  const DeleteDoubt = (_id) => {
    dispatch(deleteDoubt(_id));
  };
  const {
    data: { user },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(GetDoubts());
  }, [dispatch]);

  if (data?.isAuthenticated === false) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="Payment_Page">
            <h1 style={{ marginBottom: "2rem" }}>Doubts</h1>
            <button onClick={()=>setShowSolve(!showSolve)} className="addButton">Solved Doubts</button>
            <div className="patientBox">
              <table>
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Subject</th>
                    <th>Teacher</th>
                    <th>Details</th>
                    <th>Date</th>
                    {user?.userType === "teacher" ? 
                    <th>Delete</th>:null}
                  </tr>
                </thead>
                <tbody>
                  {beds?.map((ele) => {
                    return (
                      <tr key={ele.id}>
                        <td>{ele.class}</td>
                        <td style={{ marginLeft: "1rem" }}>{ele.subject}</td>
                        <td
                          style={{
                            color:
                              ele.occupied === "available" ? "green" : "orange",
                            fontWeight: "bold",
                          }}
                        >
                          {ele.teacherName}
                        </td>
                        <td>{ele.details}</td>
                        <td>{ele.date}</td>
                        {user?.userType === "teacher" ? <td
                          style={{ color: "red", cursor: "pointer" }}
                          onClick={() => DeleteDoubt(ele.id)}
                        >
                          Delete
                        </td>:null}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {showSolve ? <div className="Payment_Page">
            <h1 style={{ marginTop: "2rem", marginBottom:"2rem" }}>Solved Doubts</h1>
            <div className="patientBox">
              <table>
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Subject</th>
                    <th>Teacher</th>
                    <th>Details</th>
                    <th>Answer</th>
                  </tr>
                </thead>
                <tbody>
                  {beds?.map((ele) => {
                    if (ele.doubtID==null)
                    return null
                  else
                    return (
                      <tr key={ele.id}>
                        <td>{ele.class}</td>
                        <td style={{ marginLeft: "1rem" }}>{ele.subject}</td>
                        <td
                          style={{
                            color:
                              ele.occupied === "available" ? "green" : "orange",
                            fontWeight: "bold",
                          }}
                        >
                          {ele.teacherName}
                        </td>
                        <td>{ele.details}</td>
                        <td>{ele.answer}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>: null}
        </div>
      </div>
    </>
  );
};

export default Beds_Rooms;
