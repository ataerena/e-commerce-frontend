import Navbar from './Navbar';

const DefaultLayout = ({ children }) => {

  return (
    <div className='wrapper'>
      <Navbar></Navbar>
      <main className="main-screen">{children}</main>
    </div>
  );
};

export default DefaultLayout;