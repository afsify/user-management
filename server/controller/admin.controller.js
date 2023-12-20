const adminModel = require("../model/admin.model");
const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//! =============================================== Verify Login ===============================================

const login = async (req, res, next) => {
  try {
    const admin = await adminModel.findOne({ email: req.body.email });
    if (!admin) {
      return res
        .status(200)
        .send({ message: "Admin Does not Exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, admin.password);
    if (!isMatch) {
      res
        .status(200)
        .send({ message: "Password is Incorrect", success: false });
    } else {
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .send({ message: "Login Successful", success: true, data: token });
    }
  } catch (error) {
    next(error);
    res.status(500).send({ message: "Error Login", success: false });
  }
};

//! =============================================== Add User ===============================================

const insertUser = async (req, res, next) => {
  try {
    const userExists = await userModel.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User Already Exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    req.body.password = hashPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res
      .status(200)
      .send({ message: "User Created Successfully", success: true });
  } catch (error) {
    next(error);
    res.status(500).send({ message: "Error Creating User", success: false });
  }
};

//! =============================================== List User ===============================================

const getUser = async (req, res, next) => {
  try {
    const user = await userModel.find({});
    res
      .status(200)
      .send({
        message: "User Fetched Successfully",
        success: true,
        data: user,
      });
  } catch (error) {
    next(error);
    res
      .status(500)
      .send({ message: "Error getting user data", success: false });
  }
};

//! =============================================== Edit User ===============================================

const editUser = async (req, res, next) => {
  try {
    const values = req.body;
    const name = values.name;
    const email = values.email;
    const userId = values.userId;
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.name = name;
    user.email = email;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User Updated Successfully" });
  } catch (error) {
    next(error);
    res.status(500).json({ success: false, message: "Error Updating User" });
  }
};

//! =============================================== Delete User ===============================================

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findOneAndDelete({ _id: userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    res
      .status(200)
      .json({ success: true, message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
    res.status(500).json({ success: false, message: "Error Deleting User" });
  }
};

module.exports = {
  login,
  insertUser,
  getUser,
  editUser,
  deleteUser,
};
