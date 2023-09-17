from flask import Flask, jsonify, send_from_directory, request, send_file
from flask_cors import CORS #comment this on deployment
import setup

app = Flask(__name__, static_url_path='', static_folder='color-fit/build')
CORS(app) #comment this on deployment

@app.route('/upload', methods=['POST'])
def upload_file(): 
    processed_dir = "./person.jpg"

    return send_file(processed_dir)

# @app.route('/captured', methods=['GET'])
# def processed():
#     try:
#         # Process the uploaded file as needed
#         processedImage = setup.vision("C:\Users\isabe\Downloads\captured_image.jpg")  # Call your image processing function

#         # Return the image as a response with appropriate content type
#         return send_file(
#             processedImage, 
#             mimetype='image/png'
#         )

#     except Exception as e:
#         return str(e)
    
# @app.route('/process', methods=['GET'])
# def process_file():
#     if 'file' not in request.files:
#         return "No file part"
    
#     file = request.files['file']

#     if file.filename == '':
#         return "No selected file"

#     processedImage = setup.vision(file)  # Call your image processing function

#     # Return the image as a response with appropriate content type
#     return send_file(processedImage, mimetype='image/jpeg')

if __name__ == '__main__':
    app.run(debug=True)