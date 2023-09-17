import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Webcam from 'react-webcam';

export default function CameraComponent() {
  const webcamRef = useRef(null); 
  const [capturedImage, setCapturedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const navigate = () => router.push('/processed');

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
                onClick={() => {
                  saveImageLocally(capturedImage);
                  setShowModal(false);
                  setCapturedImage(null);
                  navigate();
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const capture = async () => {
    const imageSrc = await webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setShowModal(true); // Open the modal
  };

  const closeModal = () => {
    // Close the modal and reset the captured image
    setShowModal(false);
    setCapturedImage(null);
  };

  const saveImageLocally = (dataURL, fileName) => {
    // Convert the data URL to a Blob
    const blob = dataURLtoBlob(dataURL);
  
    // Create a Blob URL for the Blob
    const blobURL = URL.createObjectURL(blob);
  
    // Create a temporary anchor element
    const a = document.createElement('a');
    a.style.display = 'none';
  
    // Set the anchor's href attribute to the Blob URL and specify the download attribute
    a.href = blobURL;
    a.download = fileName || 'captured_image.jpg'; // Default file name is 'captured_image.jpg'
  
    // Append the anchor to the document body and trigger a click event
    document.body.appendChild(a);
    a.click();
  
    // Clean up by revoking the Blob URL and removing the anchor element
    URL.revokeObjectURL(blobURL);
    document.body.removeChild(a);
  };
  
  // Function to convert a data URL to a Blob
  const dataURLtoBlob = (dataURL) => {
    const parts = dataURL.split(',');
    const contentType = parts[0].match(/:(.*?);/)[1];
    const b64Data = atob(parts[1]);
    const arrayBuffer = new ArrayBuffer(b64Data.length);
    const view = new Uint8Array(arrayBuffer);
  
    for (let i = 0; i < b64Data.length; i++) {
      view[i] = b64Data.charCodeAt(i);
    }
  
    return new Blob([arrayBuffer], { type: contentType });
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
