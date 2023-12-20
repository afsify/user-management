import React from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";

function Edit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const editName = useRef();
  const editEmail = useRef();
  const userId = location.state._id;

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/admin/edit", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to Dashboard");
        navigate("/admin/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center ">
                  <div className="mb-md-2 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Edit User</h2>
                    <Form
                      className="mt-5"
                      layout="vertical"
                      onFinish={onFinish}
                    >
                      <Form.Item
                        className="d-none"
                        name="userId"
                        initialValue={userId}
                      >
                        <Input
                          className="p-2 text-black"
                          placeholder="Name"
                          ref={userId}
                        />
                      </Form.Item>
                      <Form.Item name="name" initialValue={location.state.name}>
                        <Input
                          className="p-2 text-black"
                          placeholder="Name"
                          ref={editName}
                        />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        initialValue={location.state.email}
                      >
                        <Input
                          className="p-2 text-black"
                          placeholder="Email"
                          ref={editEmail}
                        />
                      </Form.Item>
                      <Button
                        type="primary"
                        shape="round"
                        size="large"
                        className="px-5 mt-4 h1 fw-bold"
                        htmlType="submit"
                      >
                        Update
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Edit;
