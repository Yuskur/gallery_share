import React, { useState } from "react";
import './styles/profile.css';
import { PlusCircleFill } from 'react-bootstrap-icons'
import AddPhotoForm from "../components/add-photo-form";

function Profile() {
    const [addPhotoClicked, setAddPhotoClicked] = useState(false);
    const [profileImage, setProfileImage] = useState(null)
    const showState = () => {
        setAddPhotoClicked(!addPhotoClicked);
    }

    const handleUploadImage = (event) => {
        const fileImage = event.target.files[0];
        if(fileImage){
            setProfileImage(URL.createObjectURL(fileImage));
        }
    }
    const handleImageInputClick = () => {
        document.getElementById("profile-image-input").click();
    }

    return(
        <div className="profile-page-container">
            <div className="top-section-profile">
                <input 
                    type="file"
                    accept=".jpeg, .jpg, .png .HEIC"
                    onChange={handleUploadImage}
                    style={{display:'none'}}
                    id="profile-image-input"
                />
                <div className="profile-image-container" onClick={handleImageInputClick}>
                    {profileImage && (
                        <img className="profile-image" src={profileImage}/>
                    )}
                </div>
                <div className="profile-description">
                    <p>Username</p>
                    <div></div>
                </div>
            </div>
            <hr />
            <div className="bottom-section-profile">

            </div>
            <PlusCircleFill className="add-photo" onClick={showState}/>
            <AddPhotoForm trigger={addPhotoClicked} showState={showState}/>
        </div>
    );
}

export default Profile;