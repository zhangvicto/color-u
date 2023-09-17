import pandas as pd
import numpy as np
import json

colors = ['black', 'blue', 'brown', 'beige', 'orange', 'yellow', 'white', 'red', 'green', 'gold', 'purple', 'charcoal', 'grey', 'khaki', 'pink']

text_data = {}

def color_search(desc): 
    output = None
    for color in colors: 
        if desc.lower().find(color) != -1: 
            output = color

    return output

df = pd.read_parquet("clothes.parquet")

for bytes, desc in df.itertuples(index=False):
    # image = Image.open(io.BytesIO(bytes['bytes']))
    
    # image.show()
    dir = color_search(desc)

    if dir != None: 
        text_data[desc.replace(' ', '_')[0:20] + '.jpg'] = ' '.join(desc.split(" ")[1:])
    #     image.save('./dataset/' + dir + '/' + desc.replace(' ', '_')[0:20] +'.jpg')

out_file = open("./dataset/descriptions.json", "w")
json.dump(text_data, out_file)
out_file.close()
