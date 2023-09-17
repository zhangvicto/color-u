import React from 'react';

const Taskbar = ({ onNext, onPrevious }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-between">
      <button onClick={onPrevious} className="prevbutton inline-block px-4 py-2 bg-[#d9ddde] ml-10 text-[#494a43] border-2 border-[#494a43] rounded-2xl hover:bg-[#494a43] hover:text-[#d9dede] focus:outline-none focus:ring focus:ring-[#edeeef] mx-auto font-medium">
        Previous
      </button>
      <button onClick={onNext} className="nextbutton inline-block px-8 py-2 bg-[#d9ddde] mr-10 text-[#494a43] border-2 border-[#494a43] rounded-2xl hover:bg-[#494a43] hover:text-[#d9dede] focus:outline-none focus:ring focus:ring-[#edeeef] mx-auto font-medium">
        Next
      </button>
    </div>
  );
};

export default Taskbar;
