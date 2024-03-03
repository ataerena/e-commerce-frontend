import { useRouter } from 'node_modules/next/router';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.css';

const DefaultLayout = ({ children }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const handleSetLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200); 
    // have to change the fade animation duration if you want to change this value for the timeout.
    // this was specifically set for a not too snappy UX which gives the feeling of uninteractive UI for the user (at least it felt that way to me).
    // if found weird, could remove this or change the value.
    // the first solution was to use a bootstrap/Spinner for giving a loading effect but that felt like overkill.
  }

  useEffect(() => {
    router.events.on('routeChangeStart', handleSetLoading);

    return () => {
      router.events.off('routeChangeStart', handleSetLoading);
    }
  }, [router]);

  return (
    <div className='wrapper'>
      <Navbar></Navbar>
      <main className={`main-screen ${loading ? 'fading-in' : null}`}>{children}</main>
    </div>
  );
};

export default DefaultLayout;