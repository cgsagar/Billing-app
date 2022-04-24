import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Profile = (props) => {

    const profileDetails = useSelector((state) => {
        return state.user.users.data
    })
    console.log(profileDetails)

    return (
        <div className="text-center card" style={{ width: '50%', margin: '0 auto' }}>
            <h5 class="card-header">My Profile</h5>
            <div class="card-body">
                <p>Username - {profileDetails.username}</p>
                <p>Email - {profileDetails.email}</p>
                <p>Business Name - {profileDetails.businessName}</p>
                <p>Address  - {profileDetails.address}</p>
            </div>

        </div>
    )
}
export default Profile
