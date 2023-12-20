import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const getData = async () => {
    try {
      const response = await axios.post(
        "/api/user/get-info",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const name = response.data.data.name;
      setName(name);
      console.log(name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-3">
        <h3 className="fw-bold text-black pt-2 px-4">WELCOME</h3>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <span className="nav-link text-black fw-bold">Home</span>
            </li>
            <li className="nav-item">
              <span
                style={{ cursor: "pointer", color: "blue" }}
                onClick={() => navigate("/profile")}
                className="nav-link text-black fw-bold"
              >
                Profile
              </span>
            </li>
          </ul>
        </div>
        <div>
          <div>
            <span>{` Hi, ${name}`}</span>
            <hr />
          </div>
          <Button
            type="primary"
            className="fw-bold text-dark"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3 col-sm-6 item">
            <div className="card item-card card-block bg-dark text-white">
              <img
                src="https://static.pexels.com/photos/7096/people-woman-coffee-meeting.jpg"
                alt="sunset"
              />
              <div className="p-2">
                <h5 className="card-title mt-3 mb-3">
                  AI in Healthcare Diagnostics
                </h5>
                <p className="card-text">
                  AI-powered medical imaging tools enhance diagnostic accuracy.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 item">
            <div className="card item-card card-block bg-dark text-white">
              <img
                src="https://static.pexels.com/photos/7357/startup-photos.jpg"
                alt="sunset"
              />
              <div className="p-2">
                <h5 className="card-title  mt-3 mb-3">
                  5G Technology Advancements
                </h5>
                <p className="card-text">
                  5G networks drive innovations in autonomous vehicles and smart
                  cities.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 item">
            <div className="card item-card card-block bg-dark text-white">
              <img
                src="https://static.pexels.com/photos/262550/pexels-photo-262550.jpeg"
                alt="sunset"
              />
              <div className="p-2">
                <h5 className="card-title  mt-3 mb-3">Blockchain</h5>
                <p className="card-text">
                  Blockchain revolutionizes supply chain management.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 item">
            <div className="card item-card card-block bg-dark text-white">
              <img
                src="https://static.pexels.com/photos/326424/pexels-photo-326424.jpeg"
                alt="sunset"
              />
              <div className="p-2">
                <h5 className="card-title  mt-3 mb-3">
                  Emerging Cybersecurity
                </h5>
                <p className="card-text">
                  AI systems detect and prevent sophisticated cyber threats in
                  time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\nimg{\n  height:150px;\n  width:100%;\n}\n\n.item{\n  padding-left:5px;\n  padding-right:5px;\n}\n.item-card{\n  transition:0.5s;\n  cursor:pointer;\n}\n.item-card-title{  \n  font-size:15px;\n  transition:1s;\n  cursor:pointer;\n}\n.item-card-title i{  \n  font-size:15px;\n  transition:1s;\n  cursor:pointer;\n  color:#ffa710\n}\n.card-title i:hover{\n  transform: scale(1.25) rotate(100deg); \n  color:#18d4ca;\n  \n}\n.card:hover{\n  transform: scale(1.05);\n  box-shadow: 10px 10px 15px rgba(0,0,0,0.3);\n}\n.card-text{\n  height:80px;  \n}\n\n.card::before, .card::after {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  transform: scale3d(0, 0, 1);\n  transition: transform .3s ease-out 0s;\n  background: rgba(255, 255, 255, 0.1);\n  content: '';\n  pointer-events: none;\n}\n.card::before {\n  transform-origin: left top;\n}\n.card::after {\n  transform-origin: right bottom;\n}\n.card:hover::before, .card:hover::after, .card:focus::before, .card:focus::after {\n  transform: scale3d(1, 1, 1);\n}\n",
        }}
      />
    </div>
  );
}

export default Home;
