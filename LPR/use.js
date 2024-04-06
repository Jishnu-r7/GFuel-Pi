const fs = require('fs');
const FormData = require('form-data');
const https = require('https');

// Function to send image file to the Flask server
function sendImageToServer(fileName) {
  // Ngrok URL where your Flask server is exposed
  const ngrokUrl = "https://56fb-152-58-203-91.ngrok-free.app/extract-text";

  // Read the image file
  const imageData = fs.readFileSync(fileName);

  // Create a FormData object to send the file
  const formData = new FormData();
  formData.append('image_name', imageData, { filename: fileName });

  // Prepare the request options
  const options = {
    method: 'POST',
    headers: formData.getHeaders(),
  };

  // Make a POST request using HTTPS module
  const req = https.request(ngrokUrl, options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      // Log the response body
      console.log("Response:", data);
    });
  });

  req.on('error', (error) => {
    console.error('Error:', error);
  });

  // Write the form data to the request
  formData.pipe(req);
}

// Example usage: Pass the image file name as a command line argument
const fileName = process.argv[2];
if (!fileName) {
  console.error('Please provide the image file name as a command line argument.');
  process.exit(1);
}

sendImageToServer(fileName);
