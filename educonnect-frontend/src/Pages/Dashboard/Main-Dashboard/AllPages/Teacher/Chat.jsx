import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../GlobalFiles/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import "./CSS/Message.css";
import "./CSS/Chat.css";
import { Navigate } from "react-router-dom";
import axios from "axios";

import ChatHelper from "./ChatHelper";

function Chat() {
  const { data } = useSelector((store) => store.auth);
  const {
    data: { user },
  } = useSelector((state) => state.auth);
  console.log(user);

  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");

  const handleCancel = () => {
    setOpen(false);
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/manage/students/${user.id}`
      );
      setStudents(response.data.students);
    } catch (error) {
      console.error(
        "Error fetching students:",
        error.response?.data?.message || error.message
      );
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/manage/teachers/${user.id}`
      );
      setStudents(response.data.teachers);
    } catch (error) {
      console.error(
        "Error fetching teachers:",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    if (user.userType === "teacher" && open) {
      fetchStudents();
    } else if (user.userType === "student" && open) fetchTeachers();
  }, [user, open]);

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  return (
    <>
      <div className="container">
        <Sidebar />
        {open ? (
          <div className="AfterSideBar">
            <div className="mainAmbupance">
              {user?.userType === "student" ? (
                <h1>Select Teacher</h1>
              ) : (
                <h1>Select Student</h1>
              )}
              <form onSubmit={handleCancel}>
                <div>
                  <div className="inputdiv">
                    <select
                      name="selectedStudent"
                      value={selectedStudent}
                      onChange={(e) => handleStudentSelect(e.target.value)}
                      required
                    >
                      {user?.userType === "student" ? (
                        <option value="">Select Teacher</option>
                      ) : (
                        <option value="">Select Student</option>
                      )}
                      {user?.userType === "student"
                        ? students.map((teacher) => (
                            <option
                              key={teacher.id}
                              value={`${teacher.teacherName} | ${teacher.teacherID}`}
                            >
                              {`${teacher.teacherName} | ${teacher.teacherID}`}
                            </option>
                          ))
                        : students.map((student) => (
                            <option
                              key={student.id}
                              value={`${student.studentName} | ${student.studentID}`}
                            >
                              {`${student.studentName} | ${student.studentID}`}
                            </option>
                          ))}
                    </select>
                  </div>
                </div>
                <button type="submit" className="formsubmitbutton">
                  {loading ? "Loading..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        ) : (
          user?.userType === "student" ? 
          <ChatHelper
            sender={user.studentID}
            receiverName={selectedStudent.split(" | ")[0]}
            receiver={selectedStudent.split(" | ")[1]}
          />
          :
          <ChatHelper
            sender={user.teacherID}
            receiverName={selectedStudent.split(" | ")[0]}
            receiver={selectedStudent.split(" | ")[1]}
          />
        )}
      </div>
    </>
  );
}

export default Chat;
