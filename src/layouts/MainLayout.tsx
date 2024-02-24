import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className='wrapper'>
      <Navbar></Navbar>

      <main className="main-screen">{children}</main>
    </div>
  );
};

export default DefaultLayout;