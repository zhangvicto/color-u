from flask import Flask, jsonify, send_from_directory, request, send_file
from flask_cors import CORS #comment this on deployment
from setup import vision
from utils import data_uri_to_cv2_img, update_body_type

app = Flask(__name__, static_url_path='', static_folder='color-fit/build')
CORS(app) #comment this on deployment

@app.route("/", defaults={'path': ''})
def main(path):
    return "hi"
# send_from_directory(app.static_folder,'index.html')

@app.route("/api/body_type", methods=['POST'])
def data_body_type(): 
    data = request.json["body_type"]
    update_body_type(data)
    return data, 200

@app.route('/api/top', methods=['GET'])
def top_image(): 
    try: 
        data = send_file('./top.jpg')
        return data, 200
    except: 
        return jsonify({'error':'error'})

# Serve Static Image
@app.route('/api/pants', methods=['GET'])
def pants_image(): 
    try: 
        data = send_file('./pants.jpg')
        return data, 200
    except: 
        return jsonify({'error':'error'})

# Serve Static Image
@app.route('/api/shoes', methods=['GET'])
def shoes_image(): 
    try: 
        data = send_file('./shoes.jpg')
        return data, 200
    except: 
        return jsonify({'error':'error'})

@app.route('/api/upload', methods=['POST'])
def upload_image():
    uri = request.json['image']
    
    img = data_uri_to_cv2_img(uri)

    vision(img)

    return uri, 200

if __name__ == '__main__':
    app.run(debug=True)