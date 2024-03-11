const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const adminRouter = require("./routes/admin.route");
const noticeRouter = require("./routes/notice.route");
const schoolRouter= require("./routes/school.route");
const stuentRouter= require("./routes/student.route");
const doubtRouter= require("./routes/doubt.route");
const teacherRouter= require("./routes/teacher.route");
const manageRouter= require("./routes/manage.route");
const assignRouter= require("./routes/assign.route");


app.use(express.json());
app.use(cors());

// Use the adminRoutes in your app
app.use("/admin", adminRouter);
app.use("/notices",noticeRouter);
app.use("/schools",schoolRouter);
app.use("/students",stuentRouter);
app.use("/doubts",doubtRouter);
app.use("/teachers",teacherRouter);
app.use("/manage",manageRouter);
app.use("/assign",assignRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});