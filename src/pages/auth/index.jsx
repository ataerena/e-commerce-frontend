import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'node_modules/next/router';

import { StringValidator } from '@/services/utils/regex';
import Request from '../../services/actions/index';

import register from '../../styles/modules/auth.module.css';
import input from '../../styles/modules/input.module.scss';
import button from '../../styles/modules/buttons.module.scss';
import clsx from 'clsx';

import { ToastContainer, toast } from 'react-toastify';
import { defaultConfig } from '../../services/constants/notifConfig';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const t = useTranslations();
    const router = useRouter();
    
    const genders = [
        { 
            value: null,
            text: t('register.auth_fields.genders.gender')
        },
        { 
            value: "Male",
            text: t('register.auth_fields.genders.male')
        },
        { 
            value: "Female",
            text: t('register.auth_fields.genders.female')
        },
        { 
            value: "Other",
            text: t('register.auth_fields.genders.other')
        }
    ];

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        birth: '',
        gender: '',
        country: '',
        city: '',
        district: '',
        address: '',
        username: ''
    });
    const handleFormDataChange = (e) => {
        const { name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const [email, setEmail] = useState('');
    const handleEmail = (e) => {
        const newVal = e.target.value;
        setEmailValid(StringValidator.isValidEmail(newVal));
        setEmail(newVal);
    }

    const [password, setPassword] = useState('');
    const handlePassword = (e) => {
        const newVal = e.target.value;
        setPasswordValid(StringValidator.isValidPassword(newVal));
        setPassword(newVal);
    }
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const handlePasswordConfirm = (e) => {
        const newVal = e.target.value;
        setPasswordValid(StringValidator.isValidPassword(newVal));
        setPasswordConfirm(newVal);
    }
    const passwordsMatch = (first, second) => {
        return (first === second) ? true : false;
    }

    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);

    useEffect(() => {
        console.log(password)
        console.log(passwordConfirm)
        console.log("Match: ", passwordsMatch(password, passwordConfirm));
        
        
    }, [password, passwordConfirm]);


    const [clickedRegister, setClickedRegister] = useState(false);
    const handleClickProceed = () => {
        setClickedRegister(true);
        const params = {
            user_firstname: formData.name,
            user_lastname: formData.surname,
            user_email: email,
            user_birth: formData.birth,
            user_gender: formData.gender,
            user_country: formData.country,
            user_city: formData.city,
            user_district: formData.district,
            user_address: formData.address,
            user_pwd: password,
            username: formData.username
        }

        Request.auth.registerUser(params)
            .then( res => {
                toast.success(res.data.message, defaultConfig);
            })
            .catch( ({response}) => {
              toast.error(response.data.message, defaultConfig);
            })
    }



    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        Request.location.getCountries().then( (res) => {
            setCountries(res.data.data);
        })
        
    }, [])

    useEffect(() => {
        if (formData.country) {
            const params = {
                country: formData.country
            }

            Request.location.getCities(params).then( (res) => {
                setCities(res.data.data.states);
            })
        }
    }, [formData.country])

    useEffect(() => {
        if (formData.country && formData.city) {
            const params = {
                country: formData.country,
                state: formData.city
            }

            Request.location.getDistricts(params).then( (res) => {
                setDistricts(res.data.data);
            })
        }
        
    }, [formData.city])

    const [userPassword, setUserPassword] = useState('');
    const handleUserPassword = (e) => {
        const newVal = e.target.value;
        setUserPassword(newVal);
    }
    const [username, setUsername] = useState('');
    const handleUsername = (e) => {
        const newVal = e.target.value;
        setUsername(newVal);
    }


    const [clickedLogin, setClickedLogin] = useState(false);
    const handleClickLogin = async (e) => {
        setClickedLogin(true);
        const params = {
            username: username,
            user_pwd: userPassword
        };
        Request.auth.loginUser(params)
          .then( async res => {
            const userData = res.data.user_data;
            localStorage.setItem("user", JSON.stringify(userData));
            window.dispatchEvent(new Event('storage'));
            toast.success(res.data.message, defaultConfig);
            router.push('/')
          })
          .catch( ({response}) => {
            toast.error(response.data.message, defaultConfig);
          })
    }
    const handleHitEnterLogin = async (e) => {
      if(e.key === 'Enter') {
        setClickedLogin(true);
        const params = {
            username: username,
            user_pwd: userPassword
        };
        Request.auth.loginUser(params)
          .then( async res => {
            const userData = res.data.user_data;
            localStorage.setItem("user", JSON.stringify(userData));
            window.dispatchEvent(new Event('storage'));
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

              <div className={`tw-w-1/2 tw-p-4 tw-justify-center tw-text-center tw-border-thin tw-border-r tw-border-gray-500`}>
                  <div className='tw-pb-4 tw-text-2xl'>
                    {t('register.join_us')}
                  </div>

                  <div className={`tw-flex tw-justify-around tw-text-center tw-mb-4`}>
                      <input type="text" placeholder={t('register.auth_fields.name')} name='name' onChange={handleFormDataChange} value={formData.name} className={`tw-w-5/12 ${input.shape} ${input.idle} ${clsx(clickedRegister && formData.name && input.valid)} ${clsx(clickedRegister && !formData.name && input.invalid)}`}/>
                      <input type="text" placeholder={t('register.auth_fields.surname')} name='surname' onChange={handleFormDataChange} value={formData.surname} className={`tw-w-5/12 ${input.shape} ${input.idle} ${clsx(clickedRegister && formData.surname && input.valid)} ${clsx(clickedRegister && !formData.surname && input.invalid)}`}/>
                  </div>
                  <div className={`tw-flex tw-justify-around tw-text-center tw-mb-4`}>
                      <input type="date" placeholder={t('register.auth_fields.age')} name='birth' onChange={handleFormDataChange} value={formData.birth} className={`tw-w-5/12 ${input.shape} ${input.idle} ${clsx(clickedRegister && formData.birth && input.valid)} ${clsx(clickedRegister && !formData.birth && input.invalid)}`}/>
                      <select name='gender' onChange={handleFormDataChange} value={formData.gender} className={`tw-w-5/12 ${input.shape} ${input.idle} ${clsx(clickedRegister && formData.gender && input.valid)} ${clsx(clickedRegister && !formData.gender && input.invalid)}`}>
                          {genders.map(item => (
                              <option key={item.value} value={item.value}>
                                  {item.text}
                              </option>
                          ))}
                      </select>
                  </div>
                  <div className={`tw-flex tw-justify-around tw-text-center tw-mb-4`}>
                      <select name='country' onChange={handleFormDataChange} value={formData.country} className={`tw-w-3/12 ${input.shape} ${input.idle} ${clsx(clickedRegister && formData.country && input.valid)} ${clsx(clickedRegister && !formData.country && input.invalid)}`}>
                        {countries.map((item) => (
                            <option key={item.name} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                      </select>
                      <select disabled={formData.country.length <= 0} name='city' onChange={handleFormDataChange} value={formData.city} className={`tw-w-3/12 ${input.shape} ${input.idle} ${clsx(clickedRegister && formData.city && input.valid)} ${clsx(clickedRegister && !formData.city && input.invalid)}`}>
                        {cities.map((item) => (
                            <option key={item.name} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                      </select>
                      <select disabled={formData.city.length <= 0} name='district' onChange={handleFormDataChange} value={formData.district} className={`tw-w-3/12 ${input.shape} ${input.idle} ${clsx(clickedRegister && formData.district && input.valid)} ${clsx(clickedRegister && !formData.district && input.invalid)}`}>
                        {districts.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                      </select>
                  </div>
                  <div className={`tw-flex tw-justify-around tw-text-center tw-mb-4`}>
                      <textarea placeholder={t('register.auth_fields.address')} name='address' onChange={handleFormDataChange} value={formData.address} className={`tw-w-11/12 tw-h-[7em] tw-min-h-[4em] tw-max-h-[12em] ${input.shape} ${input.idle} ${clsx(clickedRegister && formData.address && input.valid)} ${clsx(clickedRegister && !formData.address && input.invalid)}`}/>
                  </div>
                  <div className={`tw-flex tw-justify-around tw-text-center tw-mb-4`}>
                      <input type="text" placeholder={t('register.auth_fields.email')} value={email} onChange={handleEmail} className={`tw-w-5/12 ${input.shape} ${input.idle} ${clsx(clickedRegister && emailValid && input.valid)} ${clsx(clickedRegister && !emailValid && input.invalid)}`}/>
                      <input type="text" placeholder={t('register.auth_fields.username')} name='username' onChange={handleFormDataChange} value={formData.username} className={`tw-w-5/12 ${input.shape} ${input.idle} ${clsx(clickedRegister && formData.username && input.valid)} ${clsx(clickedRegister && !formData.username && input.invalid)}`}/>
                  </div>
                  <div className={`tw-flex tw-justify-around tw-text-center tw-mb-4`}>
                      <input type="password" placeholder={t('register.auth_fields.password')} value={password} onChange={handlePassword} className={`tw-w-5/12 ${input.shape} ${input.idle} ${clsx(clickedRegister && passwordValid && passwordsMatch(password, passwordConfirm) && input.valid)} ${clsx(clickedRegister && (!passwordValid || !passwordsMatch(password, passwordConfirm)) && input.invalid)}`}/>
                      <input type="password" placeholder={t('register.auth_fields.password_confirm')} value={passwordConfirm} onChange={handlePasswordConfirm} className={`tw-w-5/12 ${input.shape} ${input.idle} ${clsx(clickedRegister && passwordConfirm && passwordsMatch(password, passwordConfirm) && input.valid)} ${clsx(clickedRegister && (!passwordConfirm || !passwordsMatch(password, passwordConfirm)) && input.invalid)}`}/>
                  </div>


                  <button onClick={handleClickProceed} className={`${button.pill} ${button.success} ${clsx(!passwordValid && button.disabled)}`}>
                    {t('buttons.register')}
                  </button>

                  <footer className='tw-mt-8'>
                    {t('register.privacyNote')}
                  </footer>

              </div>

              {/*/////// LOGIN ///////*/}
              <div className={`tw-w-1/2 tw-p-4 tw-justify-center tw-text-center tw-border-thin tw-border-r tw-border-gray-500`}>
                  <div className='tw-pb-4 tw-text-2xl'>
                    {t('register.login')}
                  </div>

                  <div className={`tw-flex tw-justify-around tw-text-center tw-mb-4`}>
                    <input onKeyUp={handleHitEnterLogin} type="text" placeholder={t('register.auth_fields.username')} name='username' onChange={handleUsername} value={username} className={`tw-w-5/12 ${input.shape} ${input.idle} ${clsx(clickedLogin && username && input.valid)} ${clsx(clickedLogin && !username && input.invalid)}`}/>
                    <input onKeyUp={handleHitEnterLogin} type="password" placeholder={t('register.auth_fields.password')} value={userPassword} onChange={handleUserPassword} className={`tw-w-5/12 ${input.shape} ${input.idle} ${clsx(clickedLogin && userPassword && input.valid)} ${clsx(clickedLogin && !userPassword && input.invalid)}`}/>
                  </div>


                  <button onClick={handleClickLogin} className={`${button.pill} ${button.success}`}>
                    {t('buttons.login')}
                  </button>
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