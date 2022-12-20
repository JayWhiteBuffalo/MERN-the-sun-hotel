import React, { useState } from "react";
import Bookings from "../components/BookedDates";
import Auth from "../utils/auth"
import { Link } from "react-router-dom";

// import { useMutation } from '@apollo/client';
// import { ADD_RESERVATION } from "../utils/mutations";
// import { QUERY_RESERVATION } from "../utils/queries";


//  const [addArrivalDate, { error}] = useMutation(ADD_RESERVATION, {
//     update(cache, { data: { addArrivalDate } }) {
//         try{
//         const { reservation } = cache.readQuery({ query: QUERY_RESERVATION});

//         cache.writeQuery({
//             query: QUERY_RESERVATION,
//             data: { reservation: [addArrivalDate, ...reservation] }
//         });
//     } catch (e) {
//         console.warn("First reservation insertion by user")
//     }

// }
// });

// const handleSubmit = async event => {
//     event.preventDefault();
  
//     try {
//       // add dates to database
//       await addArrivalDate({
//         variables: { arrivalDate }
//       });
  
//     } catch (e) {
//       console.error(e);
//     }
//   };
 
const Reservation = () => {
  const loggedIn = Auth.loggedIn();

    return (
        <div>
          <h1>Book your Reservation Today!</h1>
            {loggedIn ? (
              <div>
                <Bookings/>
              </div>
            ) : 
              <div>
                <Link to="/login">You need to log in first</Link>
              </div> }
        </div>
    );
};

export default Reservation;