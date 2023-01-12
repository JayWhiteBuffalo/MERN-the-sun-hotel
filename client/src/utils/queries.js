import {gql} from '@apollo/client';

//Queries all reviews by username
// export const QUERY_REVIEWS = gql`
//     query reviews($username: String){
//         reviews(username: $username) {
//             _id
//             reviewText
//             reviewStars
//             createdAt
//             username
//         }
//     }
// `;

//Queries single review by ID
// export const QUERY_REVIEW = gql`
//     query review($id: ID!) {
//         review(_id: $id) {
//             _id
//             reviewText
//             reviewStars
//             createdAt
//             username
//         }
//     }
// `;


// query allUsers
export const QUERY_USERS = gql`
  query allUsers {
    allUsers{
      _id
    }
  }
`;

//Query all Reservations

export const QUERY_RESERVATIONS = gql`
    query allReservations {
      allReservations{
            _id
            arrivalDate
            departureDate
            daysBooked
            room 
        }
    }
`;

export const QUERY_ME_RES = gql`
    query me {
      me{
            _id
            username
        }
    }
`;

export const QUERY_ME_PROFILE = gql`
    query me {
      me{
            username
            reservations {
              _id
              arrivalDate
              daysBooked
              departureDate
              room
            }
        }
    }
`;


//Query all Rooms
export const QUERY_ROOMS= gql`
    query allRooms {
      allRooms{
        id
        roomType
        roomCount
        price
        view
        bed
      }
    }
`

export const QUERY_ME = gql`
  {
    me {
      reservations {
        _id
        arrivalDate
        departureDate
        room
      }
      _id
      email
      username
    }
  }
`;

export const QUERY_USER = gql`
query Query($id: ID!) {
  user(_id: $id) {
    _id
    username
    email
    reviews {
      _id
      reviewText
      reviewStars
      createdAt
      user
    }
    reservations {
      _id
      arrivalDate
      departureDate
      daysBooked
      room
    }
  }
}
`;

export const QUERY_ALL_REVIEWS = gql`
  query Query {
    allReviews {
      reviewText
      user
      createdAt
    }
  }
`;