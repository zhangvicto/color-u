import openllm
client = openllm.client.HTTPClient('http://localhost:3000')
client.query('I have a Lingua Franca Old School embroidered cashmere sweater, please suggest matching pants and shoes.')