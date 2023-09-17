import React, { useState } from 'react';
import Image from "next/image";
import Taskbar from './taskbar';

export default function Result({ 
  // imgFace, // either screenshotted from the webcam or uploaded manually
  // monkHex, // which skin color 
  // bodyType, // from the form on the choice page
  imgTop, 
  imgPants, 
  imgShoes, 
  // text // description of the outfit
}) {
  return (
    <div>
      <Image src={imgTop} />
      <Image src={imgPants} />
      <Image src={imgShoes} />

      <p>We suggest these items for your outfit!</p>
    </div>
  )
}