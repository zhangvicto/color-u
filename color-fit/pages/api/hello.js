// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}

// Send a GET request to retrieve the latest image
fetch('/get_latest_image')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.blob(); // Get the image data as a Blob
  })
  .then(blob => {
    // Use the Blob data to display or manipulate the latest image
    const imageUrl = URL.createObjectURL(blob);
    const img = document.createElement('img');
    img.src = imageUrl;
    document.body.appendChild(img); // Display the image in the DOM
  })
  .catch(error => {
    console.error('Error:', error);
  });