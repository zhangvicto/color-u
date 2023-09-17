import cohere
import pandas as pd
from stability_sdk import client
import stability_sdk.interfaces.gooseai.generation.generation_pb2 as generation
import getpass, os
from PIL import Image
import io
import requests

stability_api = client.StabilityInference(
    key="sk-SHPchWXM0utvDHDzHx3GsVBHVZDOgVvNQbJOuyxPa9z9ne70",
    verbose=True,
)

API_URL = "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5"
headers = {"Authorization": "Bearer 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"}

co = cohere.Client("Poc7e6ygMiSArhWVvxr6igd1wWHhKUWY2b1n3xuL")

def generate(prompt):
    response = co.generate(  
    model='command-nightly',  
    prompt = prompt,  
    max_tokens=200,  
    temperature=0.750)

    result= response.generations[0].text 
    return result 

def prompt(description):
    text = "The client is female and seeking recommendation from a fashion designer for pants and shoes that would go well with a {}. Just like how Dark skinny jeans goes well with Cream-colored oversized sweater. It would be great that the two recommendations are described by 5 words and separated by a newline.".format(description)
    return text

def generate_image(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.content

def store_image(type, description): 
  try: 
    image_bytes = generate_image({
      "inputs": "Generate a professional-grade image of a" + description + "against a neutral background. Create a visually appealing composition that highlights the [clothing or accessory]'s features, making it highly desirable."
    })
  except: 
    print("Retry")

  image = Image.open(io.BytesIO(image_bytes))
  
  image.save(type + ".jpg")

result = generate(prompt("Leather Biker Jacket"))
pants_desc = result.split('\n')[0]
shoes_desc = result.split('\n')[1]
print("1: {}".format(pants_desc))
print("2: {}".format(shoes_desc))

store_image("pants", pants_desc)
store_image("shoes", shoes_desc)