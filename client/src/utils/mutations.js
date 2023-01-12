import {gql} from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_RESERVATION = gql`
    mutation addReservation($arrivalDate: String!, $departureDate: String!, $daysBooked: [String], $room:String! ) {
        addReservation (
            arrivalDate: $arrivalDate 
            departureDate: $departureDate
            daysBooked: $daysBooked
            room: $room
            ){
            arrivalDate
            departureDate
            daysBooked
            room
        }
    }
`;

export const ADD_REVIEW = gql`
  mutation($reviewText: String!) {
    addReview(reviewText: $reviewText) {
      _id
      reviewText
    }
  }
`;

export const DELETE_RESERVATION = gql`
  mutation Mutation($id: ID!) {
    deleteReservation(_id: $id) {
      _id
      arrivalDate
      daysBooked
      departureDate
      room
    }
  }
`;

export const UPDATE_EMAIL = gql`
  mutation Mutation($email: String) {
    updateUser(email: $email) {
      email
    }
  } 
`;

export const ADD_ROOM = gql`
    mutation addRoom($roomType: String!, $price: Int!, $roomCount: Int!, $view: String, $bed: String) {
        addRoom (
            roomType: $roomType, 
            price: $price,
            roomCount: $roomCount,
            view: $view,
            bed: $bed
            ){
            roomType
            price
            roomCount
            view
            bed
            }
        } 
`;
