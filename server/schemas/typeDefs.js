// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    reviews: [Review]
    reservations: [Reservation]
  }

  type Review {
    _id: ID
    reviewText: String
    reviewStars: Int
    createdAt: String
    user: String
  }

  type Reservation {
    _id: ID
    user: String
    arrivalDate: String!
    departureDate: String!
    daysBooked: [String]
    room: String!
  }

  type Room {
    id: ID
    roomType: String!
    price: Int!
    roomCount: Int!
    view: String
    bed: String
  }
 
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    allUsers: [User]
    user(_id: ID!): User
    userByName(username: String!): User
    allReviews: [Review]
    review(_id: ID!): Review
    allReservations: [Reservation]
    reservation(_id: ID!): Reservation
    allRooms: [Room]
    room(_id: ID!): Room
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    addReview(reviewText: String!): Review
    addReservation(arrivalDate: String!, departureDate: String!, room: String!, daysBooked: [String] ): Reservation
    addRoom(roomType: String!, price: Int!, roomCount: Int!): Room
    updateUser(username: String, email: String, password: String): User
    deleteReservation(_id: ID!): Reservation
    login(email: String!, password: String!): Auth
  }
  
`;

// export the typeDefs
module.exports = typeDefs;
