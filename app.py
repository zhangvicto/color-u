from flask import Flask, jsonify, send_from_directory, request, send_file
from flask_cors import CORS #comment this on deployment
import setup

app = Flask(__name__, static_url_path='', static_folder='color-fit/build')
CORS(app) #comment this on deployment

@app.route('/upload', methods=['POST'])
def upload_file(): 
    processed_dir = "./person.jpg"

    return send_file(processed_dir)

@app.route('/receive_data', methods=['POST'])
def receive_data():
    data = request.json  # Assuming the data is sent as JSON
    # Process the received data here
    # VICTOR TODO
    return jsonify({"message": "Data received successfully"})

if __name__ == '__main__':
    app.run(debug=True)