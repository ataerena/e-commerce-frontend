import { useState } from 'react';
import { useTranslations } from 'next-intl';

import Request from '../../services/actions/index';

import register from '../../styles/modules/auth.module.css';
import input from '../../styles/modules/input.module.scss';
import button from '../../styles/modules/buttons.module.scss';
import clsx from 'clsx';

import { ToastContainer, toast } from 'react-toastify';
import { defaultConfig } from '../../services/constants/notifConfig';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'node_modules/next/router';

import useUserStore from '@/services/reducers/userStore';

export default function Register() {
    const t = useTranslations();
    const router = useRouter();
    
    const { user, setUser } = useUserStore();

    const [password, setPassword] = useState('');
    const handlePassword = (e) => {
        const newVal = e.target.value;
        setPassword(newVal);
    }
    const [username, setUsername] = useState('');
    const handleUsername = (e) => {
        const newVal = e.target.value;
        setUsername(newVal);
    }


    const [clickedProceed, setClickedProceed] = useState(false);
    const handleClickProceed = async (e) => {
        setClickedProceed(true);
        const params = {
            username: username,
            user_pwd: password
        };
        Request.auth.loginUser(params)
          .then( async res => {
            const userData = res.data.user_data;
            await setUser(userData);
            toast.success(res.data.message, defaultConfig);
            router.push('/')
          })
          .catch( ({response}) => {
            toast.error(response.data.message, defaultConfig);
          })
    }
    const handleHitEnterProceed = async (e) => {
      if(e.key === 'Enter') {
        setClickedProceed(true);
        const params = {
            username: username,
            user_pwd: password
        };
        Request.auth.loginUser(params)
          .then( async res => {
            const userData = res.data.user_data;
            await setUser(userData);
            toast.success(res.data.message, defaultConfig);
            router.push('/')
          })
          .catch( ({response}) => {
            toast.error(response.data.message, defaultConfig);
          })
      }
    }
    
    return (
      <>
          <div className={`${register.shape} ${register.light} tw-flex tw-text-center tw-p-2`}>
              <ToastContainer />

              <div className={`tw-w-2/5 tw-p-4 tw-justify-center tw-text-center tw-border-thin tw-border-r tw-border-gray-500`}>
                  <div className={`tw-flex tw-justify-around tw-text-center tw-mb-4`}>
                    <input onKeyUp={handleHitEnterProceed} type="text" placeholder="Username" name='username' onChange={handleUsername} value={username} className={`tw-w-5/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && username && input.valid)} ${clsx(clickedProceed && !username && input.invalid)}`}/>
                    <input onKeyUp={handleHitEnterProceed} type="password" placeholder="Password" value={password} onChange={handlePassword} className={`tw-w-5/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && password && input.valid)} ${clsx(clickedProceed && !password && input.invalid)}`}/>
                  </div>


                  <button onClick={handleClickProceed} className={`${button.pill} ${button.success}`}>
                    {t('buttons.ok')}
                  </button>

              </div>
              <div className={`tw-w-3/5 tw-text-center`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>

          </div>
      </>
    );
}



export const getStaticProps = async (context) => {
  const messages = (await import(`../../../messages/${context.locale}.json`)).default;

  return {
    props: {
      messages,
    },
  };
};