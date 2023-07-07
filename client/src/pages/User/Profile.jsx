import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [image, setImage] = useState(null)
    const [profilePic, setProfilePic] = useState('');
    const navigate = useNavigate()

    const fetchProfilePic = async () => {
        try {
            const response = await axios.get('/api/user/get-profile', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
            });

            const data = response.data;

            if (response.status === 200) {
                setProfilePic(data.data.profilePic);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProfilePic();
    }, []);

    const handleImage =(e)=>{
        const file = e.target.files[0];
        setImage(file)
    }
    const handleFileUpload = async (event) => {
        try {
            const formData = new FormData();
            formData.append('profilePic', image);

            const response = await axios.post('/api/user/upload-pic', formData, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    "Content-Type" : "Multipart/form-data"
                },
            });

            const data = response.data;
            console.log(data)

            if (data.success) {
                fetchProfilePic();
            } else {
                alert('err')
                console.error('Error uploading profile picture:', data.message);
            }
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    };

return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <div className="mb-md-2 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Profile</h2>
                  <div className="card rounded-circle overflow-hidden" style={{ width: '200px', height: '200px', margin: '0 auto' }}>
                    <div className="card-image h-100">
                      {profilePic ? (
                        <img src={`http://localhost:5000/public/${profilePic}`} alt="Profile" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                      ) : (
                        <div className="placeholder">Select an image</div>
                      )}
                    </div>
                  </div>
                  <div className="card-content mt-3">
                    <input type="file" accept="image/*"  onChange={handleImage}/>
                  </div>
                  <button className="btn btn-primary mt-3" onClick={handleFileUpload}>Upload</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
);
}

export default Profile;
