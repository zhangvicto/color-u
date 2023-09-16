import React from 'react';
import BodyType from '../../color-fit/components/BodyType';

export default function Choice() {
  return (
    <>
      <BodyType 
        image={'https://source.unsplash.com/300x300'} 
        text="ROUND (apple)"
      />
      <BodyType 
        image={'https://source.unsplash.com/300x300'} 
        text="PEAR (triangle)"
      />
      <BodyType 
        image={'https://source.unsplash.com/300x300'} 
        text="INVERTED TRIANGLE"
      />
      <BodyType 
        image={'https://source.unsplash.com/300x300'} 
        text="RECTANGULAR (athletic)"
      />
      <BodyType 
        image={'https://source.unsplash.com/300x300'} 
        text="HOURGLASS"
      />
    </>
  )
}