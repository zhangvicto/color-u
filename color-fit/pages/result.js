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
      <div className='text-center text-4xl font-bold text-[#d9dede] bg-[#494A43] p-12 '>We suggest these items for your outfit!</div>
      <Image src={imgTop} />
      <Image src={imgPants} />
      <Image src={imgShoes} />

      <div className='flex flex-row justify-between items-center py-12 px-4 rounded-2xl mx-8 my-9'>
      <Taskbar onPrevious={handlePrevious} onNext={handleNext} />
      </div>

    </div>
  )
}