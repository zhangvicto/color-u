import cv2 
import numpy as np
from webcolors import CSS3_HEX_TO_NAMES, hex_to_rgb
# import cvzone
# from cvzone import SelfiSegmentationModule
from scipy.spatial import KDTree

skin_tones = ['#292420', '#3a312a', '#604134', '#825c43', '#a07e56', '#d7bd96', '#eadaba', '#eadaba', '#f7ead0', '#f3e7db', '#f6ede4']

def convert_rgb_to_names(rgb_tuple):
    # a dictionary of all the hex and their respective names in css3
    css3_db = CSS3_HEX_TO_NAMES
    names = []
    rgb_values = []
    for color_hex, color_name in css3_db.items():
        names.append(color_name)
        rgb_values.append(hex_to_rgb(color_hex))
    
    kdt_db = KDTree(rgb_values)
    distance, index = kdt_db.query(rgb_tuple)
    return names[index]

def separate(image): 
    backSub = cv2.createBackgroundSubtractorMOG2()
    mask = backSub.apply(image)
    return mask

# Human Identification
def vision(): 
    # Load the cascade
    # Pretrained model
    face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
    # Read the input image
    img = cv2.imread('person.jpg')
    # Convert into grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Detect faces
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)

    # Draw rectangle around the faces
    for (x, y, w, h) in faces:
        # Patch Properties
        patch_offset = 0.50
        patch_size = 50 #px
        patch = img[int(x+w/2-patch_size/2):int(x+w/2+patch_size/2), int(y+h/2-patch_size):int(y+h/2+patch_size)]

        avg_tone = cv2.mean(patch)

        # Assume person's face is centered
        # Draw Circle for person
        cv2.circle(img, (int(x+w/2), int(y+h/2)), int(w/3), (255, 0, 0), 2)
        cv2.circle(img, (int(x+w/2), int(y+h/2)), 50, (255, 0, 0), 2)
        # cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)
        tone_name = convert_rgb_to_names((int(avg_tone[0]), int(avg_tone[1]), int(avg_tone[2])))
        cv2.putText(img, "Skin Tone: {}".format(tone_name), (x, y), 0, 0.5, (0,0,255))

    # Display the output
    cv2.imshow('img', img)
    cv2.waitKey()

if __name__ == '__main__': 
    vision()