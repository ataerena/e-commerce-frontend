import { useRouter } from 'node_modules/next/router';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.css';
import spinner from '../styles/modules/spinner.module.scss';

const DefaultLayout = ({ children }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const handleSetLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }

  useEffect(() => {
    router.events.on('routeChangeStart', handleSetLoading);

    return () => {
      router.events.off('routeChangeStart', handleSetLoading);
    }
  }, [router]);

  return (
    <div className='wrapper'>
      {
        loading ?
        <div className={spinner['cover-screen']} >
          <Spinner animation="grow"></Spinner>
        </div>
        : null
      }
      <Navbar></Navbar>
      <main className="main-screen">{children}</main>
    </div>
  );
};

export default DefaultLayout;