import React from 'react';
import BodyType from '../components/BodyType';

import Apple from './assets/apl.png'
import Pear from './assets/pear.png'
import Inverted from './assets/inv.png'
import Rectangular from './assets/rect.png'
import Hourglass from './assets/hour.png'

export default function Choice() {
  return (
    <div>
      <div className='text-center text-4xl font-bold'>Which body type best describes you?</div>
      {/* row of choices */}
      <div className='flex flex-row justify-between items-center py-12 px-4'>
        <BodyType 
          image={Apple} 
          text="Apple"
        />
        <BodyType 
          image={Pear} 
          text="Pear"
        />
        <BodyType 
          image={Inverted} 
          text="Inverted"
        />
        <BodyType 
          image={Rectangular} 
          text="Rectangular"
        />
        <BodyType 
          image={Hourglass} 
          text="Hourglass"
        />
      </div>
    </div>
  )
}
