import React, {  useState } from "react";
import "./CSS/TeacherProfile.css";
import { BiTime } from "react-icons/bi";
import { GiMeditation } from "react-icons/gi";
import { AiFillCalendar, AiFillEdit } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsHouseFill, BsGenderAmbiguous } from "react-icons/bs";
import { MdOutlineCastForEducation } from "react-icons/md";
import { FaRegHospital, FaMapMarkedAlt, FaBirthdayCake } from "react-icons/fa";
import Sidebar from "../../GlobalFiles/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Modal } from "antd";
import { UpdateTeacher } from "../../../../../Redux/auth/action";
import { Navigate } from "react-router-dom";
import "./CSS/TeacherProfile.css";

const Doctor_Profile = () => {
  const { data } = useSelector((store) => store.auth);
  const {
    data: { user },
  } = useSelector((state) => state.auth);

  const disptach = useDispatch();

 
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const [messageApi, contextHolder] = message.useMessage();

  const success = (text) => {
    messageApi.success(text);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    teacherName: user.teacherName,
    age: user.age,
    gender: user.gender,
    education: user.education,
    mobile: user.mobile,
    DOB: user.DOB,
    image:user.image
  });
  console.log(formData)

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit =() => {
    setFormData({ ...formData, DOB: formData.DOB.slice(0, 10) });
    console.log('Ehh',formData)
    disptach(UpdateTeacher(formData, user.id));
    success("user updated");
    handleOk();
  };

  if (data?.isAuthenticated === false) {
    return <Navigate to={"/"} />;
  }

  if (user.userType !== "teacher") {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <>
      {contextHolder}
      <div className="container">
        <Sidebar />
        <div className="AfterSideBar">
          <div className="maindoctorProfile">
            <div className="firstBox">
              <div>
                <img src={user?.image} alt="docimg" style={{height:'250px'}}/>
              </div>
              <hr />
              <div className="singleitemdiv">
                <GiMeditation className="singledivicons" />
                <p>{user?.teacherName}</p>
              </div>
              <div className="singleitemdiv">
                <FaBirthdayCake className="singledivicons" />
                <p>{user?.DOB}</p>
              </div>
              <div className="singleitemdiv">
                <BsFillTelephoneFill className="singledivicons" />
                <p>{user?.mobile}</p>
              </div>
              <div className="singleitemdiv">
                <button onClick={showModal}>
                  {" "}
                  <AiFillEdit />
                  Edit profile
                </button>
              </div>

              <Modal
                title="Edit details"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Cancel
                  </Button>,
                  <Button key="submit" onClick={handleFormSubmit}>
                    Edit
                  </Button>,
                ]}
              >
                <form className="inputForm">
                  <input
                    name="teacherName"
                    value={formData.teacherName}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Full name"
                  />
                  <input
                    name="age"
                    value={formData.age}
                    onChange={handleFormChange}
                    type="number"
                    placeholder="Age"
                  />
                  <select name="gender" onChange={handleFormChange}>
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Others</option>
                  </select>
                  <input
                    name="education"
                    value={formData.education}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="education"
                  />
                  <input
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleFormChange}
                    type="number"
                    placeholder="mobile"
                  />
                  <input
                    name="DOB"
                    value={formData.DOB}
                    onChange={handleFormChange}
                    type="date"
                    placeholder="Date of birth"
                  />
                  <input
                    name="image"
                    value={formData.image}
                    onChange={handleFormChange}
                    type="text"
                    placeholder="Image"
                  />
                </form>
              </Modal>
            </div>
            {/* ***********  Second Div ******************** */}
            <div className="SecondBox">
              <div className="subfirstbox">
                <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                  Other Info
                </h2>
                <div className="singleitemdiv">
                  <BsGenderAmbiguous className="singledivicons" />
                  <p>{user?.gender}</p>
                </div>
                <div className="singleitemdiv">
                  <AiFillCalendar className="singledivicons" />
                  <p>{user?.age}</p>
                </div>

                <div className="singleitemdiv">
                  <MdOutlineCastForEducation className="singledivicons" />
                  <p>{user?.education}</p>
                </div>
                <div className="singleitemdiv">
                  <BsHouseFill className="singledivicons" />
                  <p>{user?.address}</p>
                </div>
              </div>
              {/* ***********  Third Div ******************** */}
              <div className="subSecondBox">
                <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                  School Details
                </h2>
                <div className="singleitemdiv">
                  <BiTime className="singledivicons" />
                  <p>09:00 AM - 04:30 PM (TIMING)</p>
                </div>
                <div className="singleitemdiv">
                  <FaRegHospital className="singledivicons" />
                  <p>R.V. School, CSE</p>
                </div>
                <div className="singleitemdiv">
                  <FaMapMarkedAlt className="singledivicons" />
                  <p>
                  Mysore Rd, Pattanagere ,RV Vidyaniketan, Post, Bengaluru, Karnataka 560059
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctor_Profile;
