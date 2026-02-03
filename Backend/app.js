require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRoutes = require("./Routes/userRouter");
const taskRoutes = require("./Routes/taskRouter");
const db = require("./db");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", function (req, res) {
  res.send("Api is running");
});

app.use("/api/auth/v1/user", userRoutes);
app.use("/api/auth/v1/task", taskRoutes);

app.listen(3000, function (req, res) {
  console.log("Server is running on port 3000");
});
