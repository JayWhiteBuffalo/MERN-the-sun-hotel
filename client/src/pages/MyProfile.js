//Import dependencies
import React from 'react';
// import { Link } from 'react-router-dom';
// import UserUpdate from '../components/UserUpdate';
// import MyReservations from '../components/MyReservations';
// import CreateReview from '../components/CreateReview';
import Header from '../components/Header/Header';
// import BookNowBox from '../components/BookNowBox';
import Profile from "../components/Profile";
// import "../components/BookNowBox/bnb.css"

// import { useQuery } from '@apollo/client';
// import { QUERY_ME } from '../utils/queries';



function MyProfile (props) {
  return (
 <div>
  <Header/>
  <Profile/>
  </div>
  )
}

export default MyProfile;