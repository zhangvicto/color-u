import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

// Function to generate a unique filename based on a timestamp
function generateUniqueFilename() {
  const timestamp = new Date().getTime();
  const randomId = Math.random().toString(36).substring(2, 10); // Generate a random identifier
  return `upload_${timestamp}_${randomId}.jpg`;
}

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

  const closeAndSendImage = async (event) => {
    if (!capturedImage) {
      // Handle the case where there's no captured image
      console.log('no captured image');
      return;
    }

    const fileInput = event.target;
    const file = fileInput.files[0];
  
    const formData = new FormData();
    formData.append('file', capturedImage); // 'file' should match the field name expected by the Flask server
  
    if (file) {
      // const uniqueFilename = generateUniqueFilename(); // Generate a unique filename
      // const formData = new FormData();

      // formData.append('file', file, uniqueFilename); // Assign the unique filename to the uploaded file

      try {
      const response = await fetch('/upload', {
        method: 'POST',
        // body: formData,
        body: JSON.stringify({ image: capturedImage }),
        headers: {
            'Content-Type': 'application/json',
          },
      });
  
      if (response.ok) {
        // Handle success
        const result = await response.text();
        console.log('File uploaded successfully:', result);
      } else {
        // Handle error
        console.error('Failed to upload image');
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error', error);
    }}

    // Close the modal and reset the captured image
    setShowModal(false);
    setCapturedImage(null);
  };

  const closeModal = () => {
    // Close the modal and reset the captured image
    setShowModal(false);
    setCapturedImage(null);
  };

  const handleFileInputChange = async (event) => {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
      const uniqueFilename = generateUniqueFilename(); // Generate a unique filename
      const formData = new FormData();

      formData.append('file', file, uniqueFilename); // Assign the unique filename to the uploaded file

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.text();
          console.log('File uploaded successfully:', result);
        } else {
          console.error('Failed to upload file');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
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
