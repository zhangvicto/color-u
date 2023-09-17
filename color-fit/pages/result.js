import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Taskbar from './taskbar';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
    </div>
  );
};

export default function Result({ 
  // imgFace, // either screenshotted from the webcam or uploaded manually
  // monkHex, // which skin color 
  // bodyType, // from the form on the choice page
  imgTop, 
  imgPants, 
  imgShoes, 
  // text // description of the outfit
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading (e.g., API request) with a delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handlePrevious = () => {
    window.location.href = "/cam"; // Change the URL to the correct path
  };

  const handleNext = () => {
    window.location.href = "/"; // Change the URL to the correct path
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Image src={imgTop} />
          <Image src={imgPants} />
          <Image src={imgShoes} />

          <p>We suggest these items for your outfit!</p>
          <Taskbar onPrevious={handlePrevious} onNext={handleNext} />
        </div>
      )}
    </div>
  )
}