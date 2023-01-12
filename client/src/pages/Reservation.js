import React, { useState } from "react";
import ReactCalendar from "../components/Calendar";
import Auth from "../utils/auth"
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";

  
const Reservation = () => {
  const loggedIn = Auth.loggedIn();

    return (
      <div className="">
        <Header/>
            {loggedIn ? (
              <div className="calendar">
              <div>
                <ReactCalendar />
              </div>
              </div>
              
             ) : 
              <div className ="text-center loginRedirect">
                <Link to="/login">You need to log in first</Link>
              </div> }
        </div>
    );
};

export default Reservation;