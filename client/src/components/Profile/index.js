//Import dependencies
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import UserUpdate from '../UserUpdate';
import MyReservations from '../MyReservations';
import CreateReview from '../CreateReview';
import Header from '../Header/Header';
import BookNowBox from '../BookNowBox';
import ProfilePal from '../ProfilePal';
import "../BookNowBox/bnb.css"
import "./profile.css"

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';


function Profile (props) {
  const { data } = useQuery(QUERY_ME);
  let me;

  if (data) {
    me = data.me;
  }

  const [menu, setMenu] = useState(undefined)

 

  return (
    <div className='my-profile'>
        {me ? (
          <div>
            <div className='welcome'>
              <h1>Welcome back <span>{me.username}</span> !</h1>
            </div>
              <div className='flex-wrap'>
                <div className='pal-wrap'>
                <div className='pal-cont'>
                <ProfilePal 
                    me={me}
                    setMenu={setMenu}
                    menu={menu}
                    />
                </div>
                </div>
                {menu === 'bookNowBox'? (
                <div className="profileBook">
                    <BookNowBox/>
                </div>
                ) : null}
                {menu === 'reservation' ? (
                    <MyReservations/>
                ) : null}
                {menu === 'email' ? (
                    <UserUpdate/>
                ) : null}
                {menu === 'review' ? (
                    <CreateReview/>
                ) : null}
              </div>
          </div>
          ) : (
            <div>
              <h1>Oh no!</h1>
              <p>It looks like you are not logged in.</p>
              <Link to='/login' >Log in here</Link>
            </div>
          )} 
      
    </div>
  )
}

export default Profile;