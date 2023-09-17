from flask import Flask, jsonify, send_from_directory, request, send_file
from flask_cors import CORS #comment this on deployment
import setup


app = Flask(__name__, static_url_path='', static_folder='color-fit/build')
CORS(app) #comment this on deployment

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        if 'file' not in request.files:
            return "No file part"
        
        file = request.files['file']

        if file.filename == '':
            return "No selected file"

        # Process the uploaded file as needed
        # You can call a function here to handle the image

        return "File uploaded successfully"

    except Exception as e:
        return str(e)
    
@app.route('/process', methods=['POST'])
def process_file():
    if 'file' not in request.files:
        return "No file part"
    
    file = request.files['file']

    if file.filename == '':
        return "No selected file"

    processedImage = setup.vision(file)  # Call your image processing function

    # Return the image as a response with appropriate content type
    return send_file(processedImage, mimetype='image/jpeg')

if __name__ == '__main__':
    app.run(debug=True)