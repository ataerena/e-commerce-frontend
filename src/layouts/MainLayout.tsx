import React, { ReactNode, useState, useContext, createContext, Dispatch, SetStateAction, useEffect } from 'react';
import Navbar from './Navbar';

interface UserContextProps {
  loggedUserData: any;
  setLoggedUserData: Dispatch<SetStateAction<any>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const [loggedUserData, setLoggedUserData] = useState<any | null>(null);

  const contextValue: UserContextProps = {
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
