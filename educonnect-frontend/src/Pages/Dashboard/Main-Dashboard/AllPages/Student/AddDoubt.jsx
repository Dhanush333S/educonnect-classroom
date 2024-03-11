import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  AddDoubts, GetTeachers,
} from "../../../../../Redux/Datas/action";
import Sidebar from "../../GlobalFiles/Sidebar";
import { Navigate } from "react-router-dom";

const notify = (text) => toast(text);

const AddDoubt = () => {
  const [loading, setLoading] = useState(false);

  const teachers=useSelector((store)=> store.data.teachers)

  console.log(teachers)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetTeachers());
  }, [dispatch]);

  const uniqueTeacherPairs = teachers
  ? Array.from(new Set(teachers.map((teacher) => `${teacher.teacherName}|${teacher.email}`)))
  : [];

  const { data } = useSelector((store) => store.auth);

  const InitData = {
    studentID: data?.user.id,
    class: "",
    subject: "",
    teacherID: "",
    date: "",
    details: ""
  };
  const [AddDoubt, setAddDoubt] = useState(InitData);

  const HandleAppointment = (e) => {
    setAddDoubt({ ...AddDoubt, [e.target.name]: e.target.value });
  };

  const HandleOnsubmitAppointment = (e) => {
    e.preventDefault();
    if (
      AddDoubt.class === "" ||
      AddDoubt.teacherID === "" ||
      AddDoubt.subject === "" ||
      AddDoubt.studentID === "" ||
      AddDoubt.details === ""
    ) {
      return notify("Please Enter All the Requried Feilds");
    }
    let TName=AddDoubt.teacherID.split("|")[0]
    let TEmail=AddDoubt.teacherID.split("|")[1]
    const isMatchingTeacher = teachers.some(
      (teacher) =>
        teacher.teacherName === TName &&
        (teacher.subject.toLowerCase()) === AddDoubt.subject.toLowerCase()
    );

    if (!isMatchingTeacher){
      return notify("Teacher and Subject not Matching")
    }
    
    setLoading(true);

    const selectedTeacher = teachers.find((teacher) => teacher.teacherName === TName && teacher.email === TEmail);
    dispatch(AddDoubts({...AddDoubt,teacherID:selectedTeacher.id}));
    notify("Doubt Asked");
    setLoading(false);
    setAddDoubt(InitData);
  };

  if (data?.isAuthenticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "student") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="Main_Add_Doctor_div">
            <h1>Ask Doubt</h1>

            <form onSubmit={HandleOnsubmitAppointment}>
              <div>
                <label>Doubt Details</label>
                <div className="inputdiv">
                  <input
                    type="text"
                    placeholder="Details"
                    name="details"
                    value={AddDoubt.details}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div>
              <div>
                <label>Date</label>
                <div className="inputdiv">
                  <input
                    type="date"
                    placeholder="date"
                    name="date"
                    value={AddDoubt.date}
                    onChange={HandleAppointment}
                    required
                  />
                </div>
              </div>

              <div>
                <label>Class</label>
                <div className="inputdiv">
                  <select
                    name="class"
                    value={AddDoubt.class}
                    onChange={HandleAppointment}
                    required
                  >
                    <option value="">Select Class</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>
                </div>
              </div>
              <div>
                <label>Subject</label>
                <div className="inputdiv">
                  <select
                    name="subject"
                    value={AddDoubt.subject}
                    onChange={HandleAppointment}
                    required
                  >
                    <option value="">Select subject</option>
                    <option value="Math">Math</option>
                    <option value="Physics">Physics</option>
                    <option value="Science">Science</option>
                    <option value="Social Science">Social Science</option>
                    <option value="English">English</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>
              <div>
                <label>Teacher</label>
                <div className="inputdiv">
                  <select
                    name="teacherID"
                    value={AddDoubt.teacherID}
                    onChange={HandleAppointment}
                    required
                  >
                    <option value="">Select teacher</option>
                    {
                      uniqueTeacherPairs.map(teacher=>
                        <option key={teacher} value={teacher}>{teacher}</option>
                        )
                    }
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="formsubmitbutton"
                style={{ width: "20%" }}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDoubt;
