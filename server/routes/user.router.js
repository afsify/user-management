const express = require("express");
const user_router = express.Router();
const userController = require("../controller/user.controller");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      path.join(__dirname, "../public/profilePic"),
      function (error, success) {
        if (error) {
          console.log(error);
        }
      }
    );
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name, function (error, success) {
      if (error) {
        console.log(error);
      }
    });
  },
});

const upload = multer({ storage: storage });

user_router.post("/sign-up", userController.signUp);
user_router.post("/sign-in", userController.signIn);
user_router.post("/get-info", auth, userController.getInfo);
user_router.get("/get-profile", auth, userController.getProfile);
user_router.post("/upload-pic", auth, upload.single("profilePic"), userController.uploadPic);

module.exports = user_router;
