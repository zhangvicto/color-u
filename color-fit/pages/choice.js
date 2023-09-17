import React from 'react';
import BodyType from '../components/BodyType';
import Taskbar from './taskbar';

import Apple from './assets/apl.png'
import Pear from './assets/pear.png'
import Inverted from './assets/inv.png'
import Rectangular from './assets/rect.png'
import Hourglass from './assets/hour.png'

export default function Choice() {

  return (
    <div>
      <div className='text-center text-4xl font-bold text-[#d9dede] bg-[#494A43] p-12 '>Which body type best describes you?</div>
      {/* row of choices */}
      <div className='flex flex-row justify-between items-center py-12 px-4 rounded-2xl mx-8'>
        <div className='hover:bg-[#EFDCD0] rounded-2xl border-[#494A43] text-[#494A43]'> 
        <BodyType 
          image={Apple} 
          text="Apple"
        /> </div>
        <div className='hover:bg-[#EAD0Ad] rounded-2xl border-[#494A43] text-[#494A43]'> 
        <BodyType 
          image={Pear} 
          text="Pear"
        /> </div>
      <div className='hover:bg-[#956D44] rounded-2xl border-[#494A43] hover:text-white'> 
        <BodyType
          image={Inverted} 
          text="Inverted"
        /> </div>
      <div className='hover:bg-[#684032] rounded-2xl border-[#494A43] hover:text-white'> 
        <BodyType 
          image={Rectangular} 
          text="Rectangular"
        /> </div>
      <div className='hover:bg-[#352B25] rounded-2xl border-[#494A43] hover:text-white'> 
        <BodyType 
          image={Hourglass} 
          text="Hourglass"
        /> </div>
      </div>

      <Taskbar/>

    </div>
  )
}
