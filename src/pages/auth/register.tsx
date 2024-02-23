import { useState } from 'react';

import Navbar from '@/components/Navbar';

import register from '../../styles/style modules/auth.module.css';
import input from '../../styles/style modules/input.module.css';

export default function Register() {
    const genders = [
        { value: 'Male', inclusive: false},
        { value: 'Female', inclusive: false},
        { value: 'Non-binary', inclusive: true},
        { value: 'Transsexual', inclusive: true},
        { value: 'Prefer not to say', inclusive: false}
    ];

    const [inclusive, setInclusive] = useState(false);

    const toggleInclusive = () => {
        setInclusive(!inclusive);
    }

    const includedGenders = inclusive ? genders : genders.filter( item => !item.inclusive)


    return (
      <>
        <div className='h-screen ata'>
          <Navbar></Navbar>
          <div className={`${register.light} flex text-center p-2`}>

              <div className={`w-2/5 p-4 justify-center text-center border-thin border-r border-gray-500`}>
                  <div className={`flex justify-around text-center mb-4`}>
                      <input type="text" placeholder="Name" className={`w-5/12 ${input.shape} ${input.valid}`}/>
                      <input type="text" placeholder="Surname" className={`w-5/12 ${input.shape} ${input.invalid}`}/>
                  </div>
                  <div className={`flex justify-around text-center mb-4`}>
                      <input type="text" placeholder="Age" className={`w-5/12 ${input.shape} ${input.idle}`}/>
                      <select className={`w-5/12 ${input.shape}`}>
                          {includedGenders.map(item => (
                              <option key={item.value} value={item.value}>
                                  {item.value}
                              </option>
                          ))}
                      </select>
                  </div>
                  <div className={`flex justify-around text-center mb-4`}>
                      <input type="text" placeholder="Email" className={`w-5/12 ${input.shape}`}/>
                      <input type="text" placeholder="Username" className={`w-5/12 ${input.shape}`}/>
                  </div>
                  <div className={`flex justify-around text-center mb-4`}>
                      <input type="password" placeholder="Password" className={`w-5/12 ${input.shape}`}/>
                      <input type="password" placeholder="Password Confirm" className={`w-5/12 ${input.shape}`}/>
                  </div>
                  <div className={`flex justify-around text-center mb-4`}>
                      <button onClick={toggleInclusive}>Inclusive</button>
                  </div>

              </div>
              <div className={`w-3/5 text-center`}>
                  ATA
              </div>

          </div>
        </div>
      </>
    );
}