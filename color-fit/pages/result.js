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
  const handlePrevious = () => {
    window.location.href = "/cam"; // Change the URL to the correct path
  };

  const handleNext = () => {
    window.location.href = "/"; // Change the URL to the correct path
  };

  return (
    <div>
      <Image src={imgTop} />
      <Image src={imgPants} />
      <Image src={imgShoes} />

      <p>We suggest these items for your outfit!</p>
      <Taskbar onPrevious={handlePrevious} onNext={handleNext} />
    </div>
  )
}