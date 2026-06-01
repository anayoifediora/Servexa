import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import React from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { SetContextLink } from '@apollo/client/link/context';

import './App.css';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import AdminDash from './Pages/AdminDash';
import Orders from './Pages/Orders';
import ViewOrderPage from './Pages/ViewOrderPage';
import Users from './Pages/Users';
import SingleUserPage from './Pages/SingleUserPage';
import Services from './Pages/Services';
import ViewServicePage from './Pages/ViewServicePage';
import Settings from './Pages/Settings';

// Create an HTTP link that tells Apollo where the GraphQL server is
const httpLink = new HttpLink({
  uri: '/graphql', // All requests will be sent to this endpoint
});

// Create a middleware link that runs BEFORE every request
const authLink = new SetContextLink((_, { headers }) => {
  // Get the JWT token from localStorage (if the user is logged in)
  const token = localStorage.getItem('id_token');

  // Return updated headers
  return {
    headers: {
      ...headers, // Keep any existing headers
      // Add Authorization header if token exists
      // Format must be: "Bearer <token>"
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create the Apollo Client instance
const client = new ApolloClient({
  // Combine both links:
  // 1. authLink runs first (adds token)
  // 2. httpLink runs second (sends request)
  link: authLink.concat(httpLink),

  // Apollo's built-in cache (stores query results in memory)
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<AdminDash />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId" element={<ViewOrderPage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:_id" element={<SingleUserPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<ViewServicePage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
