import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_RESERVATION } from '../../utils/mutations';
 
function DeleteReservation(props) {
  const [delReservation, { error }] = useMutation(DELETE_RESERVATION);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await delReservation({
      variables: { 
        id: props.value
      } 
    });
    window.location.reload();
  };

  return (
  <div>
    <h3>Delete a Reservation</h3>
    <form onSubmit={handleFormSubmit}>
      <br/>
      <div>
        <label htmlFor='reservation'>Enter booking ID</label>
        <input 
          name='_id'
          type='text'
          id='_id'
          value={props.value}
        />
      </div>
      {error ? (
          <div>
            <p>Something went wrong</p>
          </div>
        ) : null}
      <div>
        <br/>
        <button className="delete-btn" type="submit">Delete</button>
      </div>
    </form>
  </div>
  )
}

export default DeleteReservation;