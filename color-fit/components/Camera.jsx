import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Webcam from 'react-webcam';

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

function uploadImage(imageURL) {
  //const blob_data = dataURLtoBlob(imageURL)

  //console.log(blob_data)

  fetch('http://127.0.0.1:5000/api/upload', {
      method: 'POST',
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({image: imageURL})
  })
      .then(response => response.json())
      .catch(error => console.log('error', error));
}

export default function CameraComponent() {
  const webcamRef = useRef(null); 
  const [capturedImage, setCapturedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const navigate = () => router.push('/processed');

  function Modal() {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center mt-10"> {/* whole modal */}
        <div className="absolute inset-0 flex items-center justify-center ">
          <div className="bg-[#e1e5e6] p-4 w-auto h-auto rounded-lg border-2 shadow-lg text-white border-2 border-[#494a43]"> {/* modal content; TODO: center on screen */} 
            <h2 className="text-[#494a43] text-lg font-semibold mb-2">Captured Image:</h2>
            <img src={capturedImage} alt="Captured" className="mb-4" />
  
            {/* Buttons */}
            <div className="right-0 flex justify-end">
              <button
                onClick={closeModal}
                className='px-4 py-2 bg-[#efdcd0] text-[#684032] border-2 border-[#684032] rounded-2xl focus:outline-none focus:ring focus:ring-[#edeeef] mx-4 font-medium'
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  uploadImage(capturedImage)
                  //saveImageLocally(capturedImage);
                  setShowModal(false);
                  setCapturedImage(null);
                  navigate();
                }}
                className='px-4 py-2 bg-[#684032] text-[#efdcd0] border-2 border-[#684032] rounded-2xl focus:outline-none focus:ring focus:ring-[#edeeef] mx-0 font-medium'
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const removeImage = () => {
    setCapturedImage(null);
    setShowModal(false);
  };
  
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

  return (
    <div className='flex flex-col items-center'>
      <div className='flex justify-center m-5 mb-3'>
        {capturedImage ? (
          <img src={capturedImage} alt="Captured" className="w-full h-full" />
        ) : (
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={500} height={500} />
        )}
      </div>
      <div className="flex justify-center mb-5 mt-1 mr-15">
        <button className='inline-block px-4 py-2 bg-[#efdcd0] text-[#684032] border-2 border-[#684032] rounded-2xl hover:bg-[#684032] hover:text-[#efdcd0] focus:outline-none focus:ring focus:ring-[#edeeef] mx-2 font-medium' onClick={capture}>
          Capture
        </button>
  
        <label htmlFor="fileInput" className='inline-block mx-4 px-4 py-2 bg-[#efdcd0] text-[#684032] border-2 border-[#684032] rounded-2xl hover:bg-[#684032] hover:text-[#efdcd0] focus:outline-none focus:ring focus:ring-[#edeeef] mx-2 font-medium'>
          Upload
        </label>
        <input type="file" accept="image/*" id="fileInput" style={{ display: 'none' }} onChange={handleFileInputChange} />
      </div>
      {showModal && <Modal />}
    </div>
  );
  
};