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

@app.route('/get_latest_image', methods=['GET'])
def get_latest_image():
    try:
        global latest_image_filename

        if latest_image_filename:
            # Specify the path to the directory where uploaded images are stored
            image_path = os.path.join('uploads', latest_image_filename)

            # Use send_file to send the latest image data as a response
            return send_file(image_path, mimetype='image/jpeg')

        return "No latest image found"

    except Exception as e:
        return str(e)

"""
@app.route("/", defaults={'path': ''})
def main(path):
    return send_from_directory(app.static_folder,'index.html')

@app.route('/api/image', methods=['GET'])
def data_condition(): 
    try: 
        data = condition_data()
        return data, 200
    except: 
        return jsonify({'error':'error'})

@app.route('/api/data/click', methods=['GET'])
def data_click(): 
    try: 
        data = click_data()
        return data, 200
    except: 
        return jsonify({'error':'error'})

@app.route('/api/data/design', methods=['GET'])
def data_design(): 
    try: 
        data = design_data()
        return data, 200
    except: 
        return jsonify({'error':'error'})

@app.route('/api/data/monogram', methods=['GET'])
def data_monogram(): 
    try: 
        data = monogram_data()
        return data, 200
    except: 
        return jsonify({'error':'error'})

@app.route('/api/upload', methods=['POST'])
def upload(): 
    if request.json['table'] == 'condition_table': 
        return insert_condition_data(request.json['condition'], request.json['sona_id'])
    elif request.json['table'] == 'click_table': 
        return insert_click_data(request.json['sona_id'], request.json['condition'], request.json['button_id'])
    elif request.json['table'] == 'design_table': 
        return insert_design_data(request.json['sona_id'], request.json['condition'], request.json['first_item'], request.json['second_item'], request.json['third_item'], request.json['complete_outfit'])
    elif request.json['table'] == 'monogram_table': 
        return insert_monogram_data(request.json['sona_id'], request.json['condition'], request.json['text'], request.json['location'], request.json['font'], request.json['colour'], request.json['accessory'])
"""