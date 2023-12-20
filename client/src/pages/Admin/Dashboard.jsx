import React, { useEffect, useState } from "react";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function UserForm({ visible, onCreate, onCancel }) {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((error) => {
        console.log("Validation failed:", error);
      });
  };

  return (
    <Modal
      visible={visible}
      title="Insert User"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter a name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter an email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter a password" }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
}

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [size] = useState("large");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/admin/get-user");
        const userData = response.data.data;
        setUsers(userData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const editUser = (userId, name, email) => {
    navigate("/admin/edit", { state: { _id: userId, name, email } });
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`/api/admin/delete-user/${userId}`);
      if (response.data.success) {
        const updatedUsers = users.filter((user) => user._id !== userId);
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const handleCreateUser = async (values) => {
    try {
      const response = await axios.post("/api/admin/insert-user", values);
      if (response.data.success) {
        const updatedUsersResponse = await axios.get("/api/admin/get-user");
        const updatedUsersData = updatedUsersResponse.data.data;
        setUsers(updatedUsersData);
        setIsModalVisible(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="p-5">
      <div className="d-flex justify-content-between mb-5">
        <Button
          type="primary"
          className="fw-bold text-dark"
          onClick={showModal}
        >
          Insert
        </Button>
        <Button
          type="primary"
          className="fw-bold text-dark"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th className="text-center" scope="col">
              #
            </th>
            <th className="text-center" scope="col">
              Name
            </th>
            <th className="text-center" scope="col">
              Email
            </th>
            <th className="text-center" scope="col">
              Status
            </th>
            <th className="text-center" scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => (
              <tr key={index}>
                <th className="text-center" scope="row">
                  {index + 1}
                </th>
                <td className="text-center">{user && user.name}</td>
                <td className="text-center">{user && user.email}</td>
                <td className="text-center">
                  {user && (user.isBlocked ? "Blocked" : "Active")}
                </td>
                <td className="text-center">
                  <Button
                    className="me-3"
                    type="primary"
                    icon={<EditOutlined />}
                    size={size}
                    onClick={() => editUser(user._id, user.name, user.email)}
                  />
                  <Button
                    type="primary"
                    icon={<DeleteOutlined />}
                    size={size}
                    onClick={() => deleteUser(user._id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <UserForm
        visible={isModalVisible}
        onCreate={handleCreateUser}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default Dashboard;
