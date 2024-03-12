import React, {  useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import axios from "axios";

const notify = (text) => toast(text);
function QuestionPaper() {
  const { data } = useSelector((store) => store.auth);
  const {
    data: { user },
  } = useSelector((state) => state.auth);

  const [loading,setLoading]=useState(false)
  const [file, setFile] = useState(null);
  const [fileStudent,setFileStudent]=useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setFile(selectedFile);
    } else {
      notify('Invalid file type. Please select an Excel file.');
      setFile(null);
    }
  };
  const handleFileStudentChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setFileStudent(selectedFile);
    } else {
      notify('Invalid file type. Please select an Excel file.');
      setFileStudent(null);
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!file) {
      notify('No file selected. Please choose a file to upload.');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res=await axios.post(process.env.REACT_APP_API_URL+'/question', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.data.message !== "Successfully") 
      notify('File uploaded successfully');
      else
      notify(res.data.message)
      setFile(null)
    } catch (error) {
      console.error('Error uploading file:', error.response?.data?.message || error.message);
    }

    setLoading(false);
  };


  const handleFileStudentUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!fileStudent) {
      notify('No file selected. Please choose a file to upload.');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', fileStudent);

      const res=await axios.post(process.env.REACT_APP_API_URL+'/question/student', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.data.message !== "Successfully") 
      notify('File uploaded successfully');
      else
      notify(res.data.message)
      setFileStudent(null)
    } catch (error) {
      console.error('Error uploading file:', error.response?.data?.message || error.message);
    }

    setLoading(false);
  };

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
             onSubmit={handleFileUpload}
             >
              <div>
                <label>Select Question Paper</label>
                <div className="inputdiv">
                 <input key={file} type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={handleFileChange}/> 
                </div>
              </div>
              <button type="submit" className="formsubmitbutton">
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
        <div className="AfterSideBar">
          <div className="mainAmbupance">
            <h1>Upload Student Score</h1>
            <form
             onSubmit={handleFileStudentUpload}
             >
              <div>
                <label>Select Student Score</label>
                <div className="inputdiv">
                <input key={fileStudent} type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={handleFileStudentChange}/> 
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

export default QuestionPaper;
