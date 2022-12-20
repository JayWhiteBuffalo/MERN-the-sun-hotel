import React, { useState } from "react";
import Reviews from "../components/Reviews";
import Auth from "../utils/auth"
import { Link } from "react-router-dom";

const Review = () => {
  const loggedIn = Auth.loggedIn();

  return (
      <div>
        <h1>Leave a review today!</h1>
          {loggedIn ? (
              <div>
                <Reviews/>
              </div>
            ) : 
              <div>
                <Link to="/login">You need to log in first</Link>
              </div> }
      </div>
  );
};

export default Review;