import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import DeleteReservation from '../DeleteReservation';

function MyReservations () {

  const [value, setValue] = useState();
  const { data } = useQuery(QUERY_ME);
  let me;
  console.log(data);

  if (data) {
    me = data.me;
  }

  console.log(me)

  return(
    <div className='reservation-wrap'>
            <h2>
              Choose a Reservation
            </h2>
      <div className='reservation-component'>
        {me ? (
          <>
          {me.reservations.map((reservation) => (
            <button type="submit" onClick={()=>setValue(reservation._id)} className='user-reservations'key={reservation._id}>
              <h3> From: {new Date(parseInt(reservation.arrivalDate)).toLocaleDateString()} </h3>
              <h3> To: {new Date(parseInt(reservation.departureDate)).toLocaleDateString()} </h3>
              <h4>Room: {reservation.room}</h4>
              <h5>Booking ID: {reservation._id}</h5>
            </button>
              ))}
              <br/>
              <DeleteReservation
              value={value}/>
            </> 
          ) : null }
      </div>
      </div>
  )
}

export default MyReservations;