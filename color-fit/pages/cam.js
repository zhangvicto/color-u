import React from 'react';
import CameraComponent from '../components/Camera';
import Taskbar from './taskbar';

const HomePage = () => {

  const handlePrevious = () => {
    // Redirect to the index.js page
    window.location.href = "/"; // Change the URL to the correct path
  };

  const handleNext = () => {
    // Redirect to the choice.js page
    window.location.href = "/choice"; // Change the URL to the correct path
  };

  return (
    <div>
      <div className='text-center text-4xl font-bold text-[#d9dede] bg-[#494A43] p-12 '>Take a picture and explore your personalized colour fabrics!</div>
      <CameraComponent/>
      <Taskbar onPrevious={handlePrevious} onNext={handleNext} />
    </div>
  );
};

export default HomePage;
