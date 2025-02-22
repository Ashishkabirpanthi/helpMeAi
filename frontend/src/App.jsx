// src/App.jsx
import React from 'react';
import AppRoutes from './routes/AppRoutes'; // Adjust path as needed
import { UserProvider } from './context/user.context.jsx'; // Import UserProvider

const App = () => {
  return (
    <UserProvider> 
      <AppRoutes />
    </UserProvider>
  );
};

export default App;