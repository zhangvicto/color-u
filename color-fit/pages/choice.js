import React, { useState } from 'react';
import BodyType from '../components/BodyType';
import Taskbar from './taskbar';

import Apple from './assets/apl.png'
import Pear from './assets/pear.png'
import Inverted from './assets/inv.png'
import Rectangular from './assets/rect.png'
import Hourglass from './assets/hour.png'

function logBodyType(bodyType) {
  fetch('http://127.0.0.1:5000/api/body_type', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({body_type: bodyType})
  })
      .then(response => response.json())
      .catch(error => console.log('error', error));
}

export default function Choice() {
  const [bodyType, setBodyType] = useState('');

  const handlePrevious = () => {
    window.location.href = "/"; // Change the URL to the correct path
  };

  const handleNext = () => {
    console.log(bodyType);
    window.location.href = "/cam"; // Change the URL to the correct path
  };

  const sendData = async () => {
    try {
      const response = await fetch('http://your-flask-app-url/receive_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyType),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Server Response:', responseData.message);
      } else {
        console.error('Request failed');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  }

  return (
    <div>
      <div className='text-center text-4xl font-bold text-[#d9dede] bg-[#494A43] p-12 '>Which body type best describes you?</div>
      {/* row of choices */}
      <div className='flex flex-row justify-between items-center py-12 px-4 rounded-2xl mx-8'>
        <div className='hover:bg-[#EFDCD0] rounded-2xl border-[#494A43] text-[#494A43]'> 
        <BodyType 
          image={Apple} 
          text="Apple"
          onclick={() => setBodyType('apple')}
        /> </div>
        <div className='hover:bg-[#EAD0Ad] rounded-2xl border-[#494A43] text-[#494A43]'> 
        <BodyType 
          image={Pear} 
          text="Pear"
          onclick={() => setBodyType('pear')}
        /> </div>
      <div className='hover:bg-[#956D44] rounded-2xl border-[#494A43] hover:text-white'> 
        <BodyType
          image={Inverted} 
          text="Inverted"
          onclick={() => setBodyType('inverted')}
        /> </div>
      <div className='hover:bg-[#684032] rounded-2xl border-[#494A43] hover:text-white'> 
        <BodyType 
          image={Rectangular} 
          text="Rectangular"
          onclick={() => setBodyType('rectangular')}
        /> </div>
      <div className='hover:bg-[#352B25] rounded-2xl border-[#494A43] hover:text-white'> 
        <BodyType 
          image={Hourglass}
          text="Hourglass"
          onclick={() => setBodyType('hourglass')}
        /> </div>
      </div>

      <Taskbar onPrevious={handlePrevious} onNext={logBodyType(bodyType)} />

    </div>
  )
}
