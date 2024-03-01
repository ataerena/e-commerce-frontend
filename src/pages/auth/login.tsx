import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useUser } from '@/layouts/MainLayout';

import Request from '../../services/actions/index';

import register from '../../styles/style modules/auth.module.css';
import input from '../../styles/style modules/input.module.scss';
import button from '../../styles/style modules/buttons.module.scss';
import clsx from 'clsx';

export default function Register() {
    const t = useTranslations();
    const { setLoggedUserData } = useUser();

    const [password, setPassword] = useState<string>('');
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        setPassword(newVal);
    }
    const [username, setUsername] = useState<string>('');
    const handleUsername = (e: ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        setUsername(newVal);
    }


    const [clickedProceed, setClickedProceed] = useState<boolean>(false);
    const handleClickProceed = () => {
        setClickedProceed(true);
        const params = {
            username: username,
            user_pwd: password
        };
        Request.auth.loginUser(params)
            .then( res => {
              alert(res.data);
              setLoggedUserData(res.data.user_data);
            })
            .catch( ({response}) => {
              alert(response.data.message);  
            })
    }
    
    return (
      <>
          <div className={`${register.shape} ${register.light} flex text-center p-2`}>

              <div className={`w-2/5 p-4 justify-center text-center border-thin border-r border-gray-500`}>
                  <div className={`flex justify-around text-center mb-4`}>
                    <input type="text" placeholder="Username" name='username' onChange={handleUsername} value={username} className={`w-5/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && username && input.valid)} ${clsx(clickedProceed && !username && input.invalid)}`}/>
                    <input type="password" placeholder="Password" value={password} onChange={handlePassword} className={`w-5/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && password && input.valid)} ${clsx(clickedProceed && !password && input.invalid)}`}/>
                  </div>


                  <button onClick={handleClickProceed} className={`${button.pill} ${button.success}`}>
                    {t('buttons.ok')}
                  </button>

              </div>
              <div className={`w-3/5 text-center`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>

          </div>
      </>
    );
}



export const getStaticProps = async (context: any) => {
  const messages = (await import(`../../../messages/${context.locale}.json`)).default;

  return {
    props: {
      messages,
    },
  };
};