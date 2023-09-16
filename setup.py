import cv2 
import numpy as np
import webcolors

# Human Identification
def vision(): 
    # Load the cascade
    # Pretrained model
    face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
    # Read the input image
    img = cv2.imread('people.jpg')
    # Convert into grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # Detect faces
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)

    skin_tone = []
    # Draw rectangle around the faces
    for (x, y, w, h) in faces:
        # Patch Properties
        patch_size = 5
        offset = 20
        patch = img[x+offset:x+offset+patch_size, y+offset:y+offset+patch_size]

        # Avg colors in patch
        avg_tone = np.mean(patch, axis=0)
        skin_tone.append(avg_tone)

        # Draw Rectangle for person
        cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)
        tone_name = webcolors.rgb_to_name(int(avg_tone))
        cv2.putText(img, "Skin Tone {}".format(tone_name), (x, y), 0, 0.5, (0,0,255))
        
    # Display the output
    cv2.imshow('img', img)
    cv2.waitKey()

if __name__ == '__main__': 
    vision()