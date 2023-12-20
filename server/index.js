const express = require("express");
require("dotenv").config();
const app = express();
const userRouter = require("./routes/user.router");
const adminRouter = require("./routes/admin.router");
const path = require("path");
const database = require("./config/database");

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

const port = process.env.PORT || 5000;

const publicFolderPath = path.join(__dirname, "public", "profilePic");
app.use("/public", express.static(publicFolderPath));

app.listen(port, () => console.log(`Server is Running on Port ${port}`));
