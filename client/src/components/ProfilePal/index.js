import React from "react";
import "./profilepal.css";

const ProfilePal = (props) => {

    const log = () => {
        props.setMenu(null)
      }

    return(
        <group>
        <div className="palBox">
            <div>
                <h2>{props.me.username}</h2>
            </div>
            <div>
                <button type='click' onClick={()=>props.setMenu('bookNowBox')}>New Reservation</button>
            </div>
            <div>
                <button type='click' onClick={()=>props.setMenu('reservation')}>Change My Reservation</button>
            </div>
            <div>
                <button type='click' onClick={()=>props.setMenu('email')}>Change My Email</button>
            </div>
            <div>
                <button type='click' onClick={()=>props.setMenu('review')}>Write a Review</button>
            </div>
            <div>
                <button type='click' onClick={()=>log()}>Logout</button>
            </div>
        </div>
        </group>
    )
}

export default ProfilePal;