from flask import Flask, jsonify, send_from_directory, request, send_file
from flask_cors import CORS #comment this on deployment
from setup import vision
import cv2

app = Flask(__name__, static_url_path='', static_folder='color-fit/build')
CORS(app) #comment this on deployment

@app.route("/", defaults={'path': ''})
def main(path):
    return "Hello"

# Serve Static Image
@app.route('/api/pants', methods=['GET', 'POST'])
def pants_images(): 
    try: 
        data = send_file('./pants.jpg')
        return data, 200
    except: 
        return jsonify({'error':'error'})

# Serve Static Image
@app.route('/api/shoes', methods=['GET', 'POST'])
def shoes_images(): 
    try: 
        data = send_file('./shoes.jpg')
        return data, 200
    except: 
        return jsonify({'error':'error'})

@app.route('/api/upload', methods=['POST'])
def upload_image():
    try:
        if 'file' not in request.files:
            return "No file part"

    return send_file(processed_dir)

# @app.route('/captured', methods=['GET'])
# def processed():
#     try:
#         # Process the uploaded file as needed
#         processedImage = setup.vision("C:\Users\isabe\Downloads\captured_image.jpg")  # Call your image processing function

        # Process the uploaded image with your computer vision model
        # You can pass 'file' to your model for processing here
        # img = cv2.imread(file)

        # vision(img)

        # # Return a response or result from your model
        # result = "Image processed successfully"
        # return result, 200

#     if file.filename == '':
#         return "No selected file"

#     processedImage = setup.vision(file)  # Call your image processing function

#     # Return the image as a response with appropriate content type
#     return send_file(processedImage, mimetype='image/jpeg')

if __name__ == '__main__':
    app.run(debug=True)
