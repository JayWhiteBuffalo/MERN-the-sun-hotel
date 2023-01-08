import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Dining from './pages/Dining';
import Home from "./pages/Home";
import Reservation from "./pages/Reservation";
import Room from "./pages/Room";
import Error from "./pages/Error";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile.js";
import Review from "./pages/Review";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home/>}
            />
          <Route
            path="/login"
            element={<Login/>}
            />
          <Route
            path="/signup"
            element={<Signup/>}
            />
          <Route
            path="/rooms"
            element={<Room/>}
            />
          <Route
            path="/dining"
            element={<Dining/>}
            />
          <Route
            path="/reservations"
            element={<Reservation/>}
            />
          <Route 
            path="/review"
            element={<Review/>}
            />
          <Route 
            path="*" 
            element={<Error/>} 
            />
          <Route
            path="/myprofile"
            element={<MyProfile/>}
          />
        </Routes>
        <Footer/>
      </Router>
    </ApolloProvider>
    
  );
}

export default App;
