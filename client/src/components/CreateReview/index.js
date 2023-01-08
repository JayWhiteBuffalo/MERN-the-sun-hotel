import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../../utils/mutations';

function AddReview() {

  //Form logic
  const [formState, setFormState] = useState({ reviewText: '' });
  const [newReview, { error }] = useMutation(ADD_REVIEW);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await newReview({
      variables: {
        reviewText: formState.reviewText,
      }
    });
    window.alert('Review posted successfully');
    window.location.reload();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    console.log(value);
  };

  return (
    <div className='review-component'>
      <h2>Write a Review</h2>
      <br/>
      <form id="review-form" onSubmit={handleFormSubmit}>
        <div className='reviewText'>
          <textarea 
            type="text" 
            name="reviewText"
            id='reviewText' 
            rows='6'
            onChange={handleChange}
          ></textarea>
        </div>

        {error ? (
          <div>
            <p>Something went wrong</p>
          </div>
        ) : null}
        <div>
          <br/>
          <button className='submit-btn' type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddReview;