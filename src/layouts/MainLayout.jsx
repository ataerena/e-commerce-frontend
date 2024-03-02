import React, { useState, useContext, createContext, useEffect } from 'react';
import Navbar from './Navbar';

const UserContext = createContext(undefined);

const DefaultLayout = ({ children }) => {
  const [loggedUserData, setLoggedUserData] = useState(null);

  const contextValue = {
    loggedUserData,
    setLoggedUserData,
  };

  useEffect( () => {
    console.log("Data: ", loggedUserData);
  }, [loggedUserData]);

  return (
    <UserContext.Provider value={contextValue}>
      <Navbar></Navbar>
      <main className="main-screen">{children}</main>
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default DefaultLayout;
