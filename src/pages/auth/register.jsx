import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

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
    
    const genders = [
        { value: 'Gender'},
        { value: 'Male'},
        { value: 'Female'},
        { value: 'Other'}
    ];

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        age: '',
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


    const [clickedProceed, setClickedProceed] = useState(false);
    const handleClickProceed = () => {
        setClickedProceed(true);
        const params = {
            user_firstname: formData.name,
            user_lastname: formData.surname,
            user_email: email,
            user_age: formData.age,
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
    
    return (
      <>
          <div className={`${register.shape} ${register.light} tw-flex tw-text-center tw-p-2`}>
              <ToastContainer />

              <div className={`tw-w-2/5 tw-p-4 tw-justify-center tw-text-center tw-border-thin tw-border-r tw-border-gray-500`}>
                  <div className={`flex justify-around text-center mb-4`}>
                      <input type="text" placeholder="Name" name='name' onChange={handleFormDataChange} value={formData.name} className={`tw-w-5/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && formData.name && input.valid)} ${clsx(clickedProceed && !formData.name && input.invalid)}`}/>
                      <input type="text" placeholder="Surname" name='surname' onChange={handleFormDataChange} value={formData.surname} className={`tw-w-5/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && formData.surname && input.valid)} ${clsx(clickedProceed && !formData.surname && input.invalid)}`}/>
                  </div>
                  <div className={`flex justify-around text-center mb-4`}>
                      <input type="text" placeholder="Age" name='age' onChange={handleFormDataChange} value={formData.age} className={`tw-w-5/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && formData.age && input.valid)} ${clsx(clickedProceed && !formData.age && input.invalid)}`}/>
                      <select name='gender' onChange={handleFormDataChange} value={formData.gender} className={`tw-w-5/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && formData.gender && input.valid)} ${clsx(clickedProceed && !formData.gender && input.invalid)}`}>
                          {genders.map(item => (
                              <option key={item.value} value={item.value}>
                                  {item.value}
                              </option>
                          ))}
                      </select>
                  </div>
                  <div className={`flex justify-around text-center mb-4`}>
                      <select name='country' onChange={handleFormDataChange} value={formData.country} className={`tw-w-3/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && formData.country && input.valid)} ${clsx(clickedProceed && !formData.country && input.invalid)}`}>
                        {countries.map((item) => (
                            <option key={item.name} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                      </select>
                      <select disabled={formData.country.length <= 0} name='city' onChange={handleFormDataChange} value={formData.city} className={`tw-w-3/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && formData.city && input.valid)} ${clsx(clickedProceed && !formData.city && input.invalid)}`}>
                        {cities.map((item) => (
                            <option key={item.name} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                      </select>
                      <select disabled={formData.city.length <= 0} name='district' onChange={handleFormDataChange} value={formData.district} className={`tw-w-3/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && formData.district && input.valid)} ${clsx(clickedProceed && !formData.district && input.invalid)}`}>
                        {districts.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                      </select>
                  </div>
                  <div className={`tw-flex tw-justify-around tw-text-center tw-mb-4`}>
                      <textarea placeholder="Address" name='address' onChange={handleFormDataChange} value={formData.address} className={`tw-w-11/12 tw-h-[7em] tw-min-h-[4em] tw-max-h-[12em] ${input.shape} ${input.idle} ${clsx(clickedProceed && formData.address && input.valid)} ${clsx(clickedProceed && !formData.address && input.invalid)}`}/>
                  </div>
                  <div className={`tw-flex tw-justify-around tw-text-center tw-mb-4`}>
                      <input type="text" placeholder="Email" value={email} onChange={handleEmail} className={`tw-w-5/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && emailValid && input.valid)} ${clsx(clickedProceed && !emailValid && input.invalid)}`}/>
                      <input type="text" placeholder="Username" name='username' onChange={handleFormDataChange} value={formData.username} className={`tw-w-5/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && formData.username && input.valid)} ${clsx(clickedProceed && !formData.username && input.invalid)}`}/>
                  </div>
                  <div className={`tw-flex tw-justify-around tw-text-center tw-mb-4`}>
                      <input type="password" placeholder="Password" value={password} onChange={handlePassword} className={`tw-w-5/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && passwordValid && passwordsMatch(password, passwordConfirm) && input.valid)} ${clsx(clickedProceed && (!passwordValid || !passwordsMatch(password, passwordConfirm)) && input.invalid)}`}/>
                      <input type="password" placeholder="Password Confirm" value={passwordConfirm} onChange={handlePasswordConfirm} className={`tw-w-5/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && passwordConfirm && passwordsMatch(password, passwordConfirm) && input.valid)} ${clsx(clickedProceed && (!passwordConfirm || !passwordsMatch(password, passwordConfirm)) && input.invalid)}`}/>
                  </div>


                  <button onClick={handleClickProceed} className={`${button.pill} ${button.success}`}>
                    {t('buttons.ok')}
                  </button>

                  <footer className='tw-mt-8'>
                    {t('register.privacyNote')}
                  </footer>

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