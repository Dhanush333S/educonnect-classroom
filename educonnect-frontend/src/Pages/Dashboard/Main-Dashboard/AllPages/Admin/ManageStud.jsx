import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CSS/AddButton.css";
import { Navigate } from "react-router-dom";
import { GetAllTeachers } from "../../../../../Redux/Datas/action";
import axios from "axios";

const notify = (text) => toast(text);

function ManageStud() {
  const [loading, setLoading] = useState(false);
  const [inputFields, setInputFields] = useState([{ id: 1, value: "" }]);
  const [teacherStudent, setTeacherStudent] = useState("");
  const [teacherClass, setTeacherClass] = useState("");
  const [classInput, setClassInput] = useState("");
  const [subject, setSubject] = useState("");

  const handleInputChange = (index, value) => {
    const updatedFields = [...inputFields];
    updatedFields[index].value = value;
    setInputFields(updatedFields);
  };

  const handleAddField = () => {
    setInputFields([...inputFields, { id: inputFields.length + 1, value: "" }]);
  };
  const handleDeleteField = () => {
    if (inputFields.length > 1) {
      const updatedFields = inputFields.slice(0, -1);
      setInputFields(updatedFields);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (teacherStudent === "") {
      return notify("Please Enter All the Requried Feilds");
    }
    let TName = teacherStudent.split("|")[0];
    let TEmail = teacherStudent.split("|")[1];
    const isMatchingTeacher = teachers.some(
      (teacher) => teacher.teacherName === TName && teacher.email === TEmail
    );

    if (!isMatchingTeacher) {
      return notify("Teacher not found");
    }

    setLoading(true);
    const selectedTeacher = teachers.find(
      (teacher) => teacher.teacherName === TName && teacher.email === TEmail
    );
    try {
      const teacherID = selectedTeacher.id;
      const studentIDs = inputFields.map((field) => field.value);
      const res = await axios.post(process.env.REACT_APP_API_URL + "/manage", {
        teacherID,
        studentIDs,
      });
      if (res.data.message !== "Successfully") {
        notify(res.data.message);
      } else notify("Students Linked");
    } catch (error) {
      notify("Something went wrong");
    }
    setLoading(false);
    setTeacherStudent("");
    setInputFields([{ id: 1, value: "" }]);
  };

  const handleTeacherAssignment= async(e)=>{
    e.preventDefault();
    if (teacherClass === "" || classInput==="" || subject==="") {
      return notify("Please Enter All the Requried Feilds");
    }
    let TName = teacherClass.split("|")[0];
    let TEmail = teacherClass.split("|")[1];
    const isMatchingTeacher = teachers.some(
      (teacher) => teacher.teacherName === TName && teacher.email === TEmail
    );

    if (!isMatchingTeacher) {
      return notify("Teacher not found");
    }
    setLoading(true);
    const selectedTeacher = teachers.find(
      (teacher) => teacher.teacherName === TName && teacher.email === TEmail
    );
    try {
      const teacherID = selectedTeacher.id;
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/assign",
        {
          teacherID: teacherID,
          classInput: classInput,
          subject: subject,
        }
      );
      if (res.data.message !== "Successfully") {
        notify(res.data.message);
      } else notify("Teacher Assigned !!");
    } catch (error) {
      notify("Something went wrong");
    }
    setLoading(false);
    setClassInput("");
    setSubject("");
    setTeacherClass("");
  }

  const teachers = useSelector((store) => store.data.teachers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllTeachers());
  }, [dispatch]);

  const uniqueTeacherPairs = teachers
  ? Array.from(new Set(teachers.map((teacher) => `${teacher.teacherName}|${teacher.email}`)))
  : [];


  const { data } = useSelector((store) => store.auth);
  if (data?.isAuthenticated === false) {
    return <Navigate to={"/"} />;
  }

  if (data?.user.userType !== "admin") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="mainAmbupance">
            <h1>Manage Students</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Select Teacher</label>
                <div className="inputdiv">
                  <select
                    name="teacherID"
                    value={teacherStudent}
                    onChange={(e) => setTeacherStudent(e.target.value)}
                    required
                  >
                    <option value="">Select teacher</option>
                    {uniqueTeacherPairs.map((teacher) => (
                      <option key={teacher} value={teacher}>
                        {teacher}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {inputFields.map((field, index) => (
                <div key={field.id}>
                  <label>{`Select Student #${index + 1}`}</label>
                  <div className="inputdiv">
                    <input
                      type="number"
                      value={field.value}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      required
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddField}
                className="addButton"
              >
                Add
              </button>
              <button
                type="button"
                onClick={handleDeleteField}
                className="addButton"
              >
                Delete
              </button>
              <button type="submit" className="formsubmitbutton">
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
        <div className="AfterSideBar">
          <div className="mainAmbupance">
            <h1>Assign Teachers</h1>
            <form onSubmit={handleTeacherAssignment}>
              <div>
                <label>Select Teacher</label>
                <div className="inputdiv">
                  <select
                    name="teacherID"
                    value={teacherClass}
                    onChange={(e)=>setTeacherClass(e.target.value)}
                    required
                  >
                    <option value="">Select teacher</option>
                    {uniqueTeacherPairs.map((teacher) => (
                      <option key={teacher} value={teacher}>
                        {teacher}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label>Class</label>
                <div className="inputdiv">
                  <select
                    name="class"
                    value={classInput}
                    onChange={(e)=>setClassInput(e.target.value)}
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
                    value={subject}
                    onChange={(e)=>setSubject(e.target.value)}
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


              <button type="submit" className="formsubmitbutton">
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageStud;
