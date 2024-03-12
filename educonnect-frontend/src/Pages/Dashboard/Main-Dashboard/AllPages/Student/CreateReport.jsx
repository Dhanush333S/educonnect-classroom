import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Navigate } from "react-router-dom";

function QuestionPaper() {
  const { data } = useSelector((store) => store.auth);
  const {
    data: { user },
  } = useSelector((state) => state.auth);

  const [testIds, setTestIds] = useState([]);
  const [selectedTestId, setSelectedTestId] = useState("");
  const [tableData, setTableData] = useState([]);
  const [totalMarks, setTotalMarks] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [grade, setGrade] = useState("");
  const [gradeDetails, setGradeDetails] = useState("");

  useEffect(() => {
    const fetchTestIds = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/result/testIDs/${user.studentID}`);
        setTestIds(response.data.testIDs);
      } catch (error) {
        console.error("Error fetching test IDs:", error.response?.data?.message || error.message);
      }
    };

    if (user.userType === "student") {
      fetchTestIds();
    }
  }, [user]);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/result/${user.studentID}/${selectedTestId}`);
      const { testResults, questionPaper } = response.data;
  
      // Process the data to calculate total marks and total marks allotted
      let updatedTotalMarks = 0;
      let updatedTotalMarksAllotted = 0;
  
      const updatedTableData = testResults.map((result) => {
        const marksAllotted = questionPaper.find((q) => q.questionNumber === result.questionNumber).marksAllotted;
        updatedTotalMarks += result.marksObtained;
        updatedTotalMarksAllotted += marksAllotted;
  
        return {
          questionNumber: result.questionNumber,
          marksObtained: result.marksObtained,
          marksAllotted,
        };
      });
  
      const updatedPercentage = (updatedTotalMarks / updatedTotalMarksAllotted) * 100;
  
      // Fetch grade based on the percentage
      const gradeResponse = await axios.get(`${process.env.REACT_APP_API_URL}/grade/${updatedPercentage}`);
      const { grade, details } = gradeResponse.data;
  
      setTableData(updatedTableData);
      setTotalMarks(updatedTotalMarks);
      setPercentage(updatedPercentage);
      setGrade(grade);
      setGradeDetails(details);
    } catch (error) {
      console.error('Error fetching test results:', error.response?.data?.message || error.message);
    }
  };
  

  useEffect(() => {
    setLoading(true);
    if (user.userType === "student" && selectedTestId) {
      fetchData();
    }
    setLoading(false);
  }, [selectedTestId]);

  if (data?.isAuthenticated === false) {
    return <Navigate to={"/"} />;
  }

  if (user.userType !== "student") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="mainAmbupance">
            <h1>View Test Report</h1>
            <div>
              <label>Select Test ID</label>
              <div className="inputdiv">
                <select
                  name="testID"
                  value={selectedTestId}
                  onChange={(e) => setSelectedTestId(e.target.value)}
                  required
                >
                  <option value="" disabled>Select Test ID</option>
                  {testIds.map((testId) => (
                    <option key={testId} value={testId}>
                      {testId}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? "Loading..." : (
              <>
                <table style={{ marginTop: '3rem' }}>
                  <thead>
                    <tr>
                      <th>Question Number</th>
                      <th>Marks Obtained</th>
                      <th>Marks Allotted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row) => (
                      <tr key={row.questionNumber}>
                        <td>{row.questionNumber}</td>
                        <td>{row.marksObtained}</td>
                        <td>{row.marksAllotted}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div>
                  <p>Total Marks Obtained: {totalMarks}</p>
                  <p>Percentage: {percentage.toFixed(2)}%</p>
                  <p>Grade: {grade}</p>
                  <p>Grade Details: {gradeDetails}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default QuestionPaper;
