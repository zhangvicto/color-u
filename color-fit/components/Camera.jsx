import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

export default function CameraComponent() {
  const webcamRef = useRef(null); 
  const [capturedImage, setCapturedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function Modal() {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center h-screen w-screen"> {/* whole modal */}
        <div className='fixed inset-0 h-screen bg-gray-300 bg-opacity-30'> {/* modal overlay */}
          <div className="bg-green-500 w-1/2 h-auto p-4 bg-black rounded-lg border-2 shadow-lg text-white z-50"> {/* modal content; TODO: center on screen */} 
            <h2 className="text-lg font-semibold mb-2">Captured Image:</h2>
            <img src={capturedImage} alt="Captured" className="mb-4" />
  
            {/* Buttons */}
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={closeAndSendImage}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
          {/* <div className="modal-content">
            <h2>Captured Image</h2>
            <img src={capturedImage} alt="Captured" />
            <button onClick={closeModal}>Cancel</button>
            <button onClick={closeAndSendImage}>Confirm</button>
          </div> */}
        </div>
      </div>
    )
  }

  const capture = async () => {
    const imageSrc = await webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setShowModal(true); // Open the modal
  };

  const closeAndSendImage = () => {
    // Perform the POST request with the captured image
    // Replace this with your actual POST request logic
    // Example:
    // fetch('/your-api-endpoint', {
    //   method: 'POST',
    //   body: JSON.stringify({ image: capturedImage }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    // .then(response => {
    //   // Handle response
    // })
    // .catch(error => {
    //   // Handle error
    // });

    // Close the modal and reset the captured image
    setShowModal(false);
    setCapturedImage(null);
  };

  const closeModal = () => {
    // Close the modal and reset the captured image
    setShowModal(false);
    setCapturedImage(null);
  };

  return (
    <div>
      <h1>Make sure you give your laptop camera access.</h1>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <button className="bg-yellow-500" onClick={capture}>Capture</button>
      
      {showModal && (
        <Modal className="flex justify-center items-center" />
      )}
    </div>
  );
};
