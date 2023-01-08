import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_EMAIL } from '../../utils/mutations';

function UpdateEmail(props) {
  const [formState, setFormState] = useState({ email: ''});
  const [newEmail, { error }] = useMutation(UPDATE_EMAIL);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await newEmail({
      variables: {
        email: formState.email
      }
    });
    window.alert('Email updated successfully');
    window.location.reload();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
  <div className='profile-email'>
    <h2>Change your Email</h2>
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor='email'>Enter new email</label>
        <input 
          placeholder='newemail@test.com'
          name='email'
          type='email'
          id='email'
          onChange={handleChange}
        />
      </div>
      {error ? (
          <div>
            <p>Something went wrong</p>
          </div>
        ) : null}
        <br/>
      <div>
        <button className='submit-btn' type="submit">Submit</button>
      </div>
    </form>
  </div>
  )
}

export default UpdateEmail;