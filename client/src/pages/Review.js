import React from "react";
import Header from "../components/Header/Header";

import { useQuery } from "@apollo/client";
import { QUERY_ALL_REVIEWS } from "../utils/queries";

const Review = () => {
  const { data } = useQuery(QUERY_ALL_REVIEWS);
  let reviews;

  if (data) {
    reviews = data.allReviews;
  }

  console.log(reviews);

  return (
    <div>
    <Header/>
      <div className="review-page">
        <h1>Leave a review today!</h1>
        <div className="review-flex">
          { reviews ? (
             <div className="review-wrap">
              {reviews.map((review) => (
                <div className="review-container"key={review._id}>
                  <p className="review-date">{review.createdAt}</p>
                  <p className="review-body">"{review.reviewText}"</p>
                </div>
              ))}
            </div>
          

           ) : null}

      </div>   
      </div>
      </div>
  );
};

export default Review;