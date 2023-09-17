from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS #comment this on deployment
import setup


app = Flask(__name__, static_url_path='', static_folder='color-fit/build')
CORS(app) #comment this on deployment

@app.route('/upload', methods=['POST'])
def upload_image():
    try:
        if 'file' not in request.files:
            return "No file part"

        file = request.files['file']

        if file.filename == '':
            return "No selected file"

        # Process the uploaded image with your computer vision model
        # You can pass 'file' to your model for processing here
        setup.vision(file)

        # Return a response or result from your model
        result = "Image processed successfully"
        return result

    except Exception as e:
        return str(e)

if __name__ == '__main__':
    app.run(debug=True)