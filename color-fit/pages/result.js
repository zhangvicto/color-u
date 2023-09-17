export default function Result() {
  const [processedImage, setProcessedImage] = useState(null);

  const handleImageProcessing = async () => {
    const imageFile = document.querySelector('input[type="file"]').files[0];
    const formData = new FormData();
    formData.append('file', imageFile);

    try {
      const response = await fetch('http://your-flask-app-url/process_image', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Convert the response to a blob and create a URL
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        // Set the processed image URL in state
        setProcessedImage(imageUrl);
      } else {
        // Handle error
        console.error('Failed to process image');
      }
    } catch (error) {
      // Handle network errors
      console.error('Network error', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" />
      <button onClick={handleImageProcessing}>Process Image</button>
      {processedImage && (
        <img src={processedImage} alt="Processed" />
      )}
    </div>
  );
}