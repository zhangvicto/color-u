import React, { useState } from 'react';

export default function Processed() {
  const [imageUrl, setImageUrl] = useState('');

  const fetchProcessedImage = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'GET',
        headers: {
                  'Content-Type': 'application/json',
                  mode: 'no-cors'
                 }, 
      });

      if (response.ok) {
        // Convert the response to a Blob and create a URL
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        // Set the image URL in state
        setImageUrl(imageUrl);
      } else {
        console.error('Failed to fetch generated image');
      }
    } catch (error) {
      console.error('Network error', error);
    }
  };

  return (
    <div>
      <button onClick={fetchProcessedImage}>Fetch Generated Image</button>
      {imageUrl && (
        <img src={imageUrl} alt="Generated Image" />
      )}
    </div>
  );
};