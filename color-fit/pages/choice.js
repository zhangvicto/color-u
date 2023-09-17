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
      console.log('Selected body type:', bodyType);

}

export default function Choice() {
  const [selectedBodyType, setSelectedBodyType] = useState(null);

  const handlePrevious = () => {
    window.location.href = "/"; // Change the URL to the correct path
  };

  const handleNext = () => {
    console.log(BodyType);
    window.location.href = "/cam"; // Change the URL to the correct path
  };

  const handleBodyTypeClick = (bodyType) => {
    setSelectedBodyType(bodyType);
    logBodyType(bodyType); // Log the selected body type
  };
  
  const sendData = async () => {
    try {
      const response = await fetch('http://your-flask-app-url/receive_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(BodyType),
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
      <div className={`rounded-2xl border-[#494A43] text-[#494A43] ${selectedBodyType === 'apple' ? 'bg-[#EFDCD0]' : 'hover:bg-[#EFDCD0]'}`} onClick={() => handleBodyTypeClick('apple')}>        
          <BodyType 
          image={Apple} 
          text="Apple"
          onClick={() => handleBodyTypeClick('apple')}
          /> </div>
      <div className={`rounded-2xl border-[#494A43] text-[#494A43] ${selectedBodyType === 'pear' ? 'bg-[#EAD0Ad]' : 'hover:bg-[#EAD0Ad]'}`} onClick={() => handleBodyTypeClick('pear')}>        
        <BodyType 
          image={Pear} 
          text="Pear"
          onClick={() => handleBodyTypeClick('pear')}
          /> </div>
      <div className={`rounded-2xl border-[#494A43] ${selectedBodyType === 'inverted' ? 'text-white' : 'text-[#494A43]'} hover:text-white ${selectedBodyType === 'inverted' ? 'bg-[#956D44]' : 'hover:bg-[#956D44]'}`} onClick={() => handleBodyTypeClick('inverted')}>        
        <BodyType
          image={Inverted} 
          text="Inverted"
          onClick={() => handleBodyTypeClick('inverted')}
          /> </div>
      <div className={`rounded-2xl border-[#494A43] ${selectedBodyType === 'rectangular' ? 'text-white' : 'text-[#494A43]'} hover:text-white ${selectedBodyType === 'rectangular' ? 'bg-[#684032]' : 'hover:bg-[#684032]'}`} onClick={() => handleBodyTypeClick('rectangular')}>        
        <BodyType 
          image={Rectangular} 
          text="Rectangular"
          onClick={() => handleBodyTypeClick('rectangular')}
          /> </div>
      <div className={`rounded-2xl border-[#494A43] ${selectedBodyType === 'hourglass' ? 'text-white' : 'text-[#494A43]'} hover:text-white ${selectedBodyType === 'hourglass' ? 'bg-[#352B25]' : 'hover:bg-[#352B25]'}`} onClick={() => handleBodyTypeClick('hourglass')}>        
        <BodyType 
          image={Hourglass}
          text="Hourglass"
          onClick={() => handleBodyTypeClick('hourglass')}
          /> </div>
      </div>


      <Taskbar onPrevious={handlePrevious} onNext={()=>{logBodyType(BodyType); handleNext(); }} />

    </div>
  )
}
