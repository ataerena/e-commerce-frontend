import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { StringValidator } from '@/services/utils/regex';
import Request from '../../services/actions/index';

import register from '../../styles/style modules/auth.module.css';
import input from '../../styles/style modules/input.module.scss';
import button from '../../styles/style modules/buttons.module.scss';
import clsx from 'clsx';

export default function Register() {
    const t = useTranslations('navbar');
    
    const genders = [
        { value: 'Gender'},
        { value: 'Male'},
        { value: 'Female'},
        { value: 'Other'}
    ];
    const country = [
        { value: 'Country'},
        { value: 'Male'},
        { value: 'Female'},
        { value: 'Other'}
    ];
    const city = [
        { value: 'City'},
        { value: 'Male'},
        { value: 'Female'},
        { value: 'Other'}
    ];
    const district = [
        { value: 'District'},
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
    const handleFormDataChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const [email, setEmail] = useState<string>('');
    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        setEmailValid(StringValidator.isValidEmail(newVal));
        setEmail(newVal);
    }

    const [password, setPassword] = useState<string>('');
    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        setPasswordValid(StringValidator.isValidPassword(newVal));
        setPassword(newVal);
    }
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const handlePasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.value;
        setPasswordValid(StringValidator.isValidPassword(newVal));
        setPasswordConfirm(newVal);
    }
    const passwordsMatch = (first: string, second: string) => {
        return (first === second) ? true : false;
    }

    const [emailValid, setEmailValid] = useState<boolean>(false);
    const [passwordValid, setPasswordValid] = useState<boolean>(false);

    useEffect(() => {
        console.log(password)
        console.log(passwordConfirm)
        console.log("Match: ", passwordsMatch(password, passwordConfirm));
        
        
    }, [password, passwordConfirm]);


    const [clickedProceed, setClickedProceed] = useState<boolean>(false);
    const handleClickProceed = () => {
        setClickedProceed(true);
    }



    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        Request.location.getCountries().then( (res: any) => {
            setCountries(res.data.data);
        })
        
    }, [])

    useEffect(() => {
        if (formData.country) {
            const params = {
                country: formData.country
            }

            Request.location.getCities(params).then( (res: any) => {
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

            Request.location.getDistricts(params).then( (res: any) => {
                setDistricts(res.data.data);
            })
        }
        
    }, [formData.city])
    
    return (
      <>
          <div className={`${register.shape} ${register.light} flex text-center p-2`}>

              <div className={`w-2/5 p-4 justify-center text-center border-thin border-r border-gray-500`}>
                  <div className={`flex justify-around text-center mb-4`}>
                      <input type="text" placeholder="Name" name='name' onChange={handleFormDataChange} value={formData.name} className={`w-5/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && formData.name && input.valid)} ${clsx(clickedProceed && !formData.name && input.invalid)}`}/>
                      <input type="text" placeholder="Surname" name='surname' onChange={handleFormDataChange} value={formData.surname} className={`w-5/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && formData.surname && input.valid)} ${clsx(clickedProceed && !formData.surname && input.invalid)}`}/>
                  </div>
                  <div className={`flex justify-around text-center mb-4`}>
                      <input type="text" placeholder="Age" name='age' onChange={handleFormDataChange} value={formData.age} className={`w-5/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && formData.age && input.valid)} ${clsx(clickedProceed && !formData.age && input.invalid)}`}/>
                      <select name='gender' onChange={handleFormDataChange} value={formData.gender} className={`w-5/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && formData.gender && input.valid)} ${clsx(clickedProceed && !formData.gender && input.invalid)}`}>
                          {genders.map(item => (
                              <option key={item.value} value={item.value}>
                                  {item.value}
                              </option>
                          ))}
                      </select>
                  </div>
                  <div className={`flex justify-around text-center mb-4`}>
                      <select name='country' onChange={handleFormDataChange} value={formData.country} className={`w-3/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && formData.country && input.valid)} ${clsx(clickedProceed && !formData.country && input.invalid)}`}>
                        {countries.map((item:any) => (
                            <option key={item.name} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                      </select>
                      <select disabled={formData.country.length <= 0} name='city' onChange={handleFormDataChange} value={formData.city} className={`w-3/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && formData.city && input.valid)} ${clsx(clickedProceed && !formData.city && input.invalid)}`}>
                        {cities.map((item:any) => (
                            <option key={item.name} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                      </select>
                      <select disabled={formData.city.length <= 0} name='district' onChange={handleFormDataChange} value={formData.district} className={`w-3/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && formData.district && input.valid)} ${clsx(clickedProceed && !formData.district && input.invalid)}`}>
                        {districts.map((item:any) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                      </select>
                  </div>
                  <div className={`flex justify-around text-center mb-4`}>
                      <textarea placeholder="Address" name='address' onChange={handleFormDataChange} value={formData.address} className={`w-11/12 h-[7em] min-h-[4em] max-h-[12em] ${input.shape} ${input.idle} ${clsx(clickedProceed && formData.address && input.valid)} ${clsx(clickedProceed && !formData.address && input.invalid)}`}/>
                  </div>
                  <div className={`flex justify-around text-center mb-4`}>
                      <input type="text" placeholder="Email" value={email} onChange={handleEmail} className={`w-5/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && emailValid && input.valid)} ${clsx(clickedProceed && !emailValid && input.invalid)}`}/>
                      <input type="text" placeholder="Username" name='username' onChange={handleFormDataChange} value={formData.username} className={`w-5/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && formData.username && input.valid)} ${clsx(clickedProceed && !formData.username && input.invalid)}`}/>
                  </div>
                  <div className={`flex justify-around text-center mb-4`}>
                      <input type="password" placeholder="Password" value={password} onChange={handlePassword} className={`w-5/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && passwordValid && passwordsMatch(password, passwordConfirm) && input.valid)} ${clsx(clickedProceed && (!passwordValid || !passwordsMatch(password, passwordConfirm)) && input.invalid)}`}/>
                      <input type="password" placeholder="Password Confirm" value={passwordConfirm} onChange={handlePasswordConfirm} className={`w-5/12 ${input.shape} ${input.idle} ${clsx(clickedProceed && passwordConfirm && passwordsMatch(password, passwordConfirm) && input.valid)} ${clsx(clickedProceed && (!passwordConfirm || !passwordsMatch(password, passwordConfirm)) && input.invalid)}`}/>
                  </div>


                  <button onClick={handleClickProceed} className={`${button.pill} ${button.success}`}>
                    Proceed
                  </button>

              </div>
              <div className={`w-3/5 text-center`}>
                  {t('all')}
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