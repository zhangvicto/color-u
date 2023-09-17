import cv2
import base64
import numpy as np

def data_uri_to_cv2_img(uri):
    encoded_data = uri.split(',')[1]
    nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)

    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img

def update_body_type(body_type): 
    with open('local_data.txt', 'w') as f: 
        f.write(body_type)