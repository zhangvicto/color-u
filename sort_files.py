import pandas as pd
from PIL import Image
import io
import numpy as np
import webcolors

colors = ['black', 'blue', 'brown', 'beige', 'orange', 'yellow', 'white', 'red', 'green', 'gold', 'purple', 'charcoal', 'grey', 'khaki', 'pink']

def color_search(desc): 
    output = None
    for color in colors: 
        if desc.lower().find(color) != -1: 
            output = color

    return output

df = pd.read_parquet("clothes.parquet")

for bytes, desc in df.itertuples(index=False):
    image = Image.open(io.BytesIO(bytes['bytes']))
    # image.show()
    dir = color_search(desc)
    if dir != None: 
        image.save('./dataset/' + dir + '/' + desc.replace(' ', '_')[0:20] +'.jpg')