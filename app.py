from flask import Flask, jsonify, send_from_directory, send_file, request
from flask_cors import CORS

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app)

@app.route("/", defaults={'path': ''})
def main(path):
    return "Hello"

# send_from_directory(app.static_folder,'index.html')


# Serve Static Image
@app.route('/api/pants', methods=['GET', 'POST'])
def pants_images(): 
    try: 
        data = send_file('./cohere/pants.jpg')
        return data, 200
    except: 
        return jsonify({'error':'error'})

# Serve Static Image
@app.route('/api/shoes', methods=['GET', 'POST'])
def shoes_images(): 
    try: 
        data = send_file('./cohere/shoes.jpg')
        return data, 200
    except: 
        return jsonify({'error':'error'})