import cohere
import pandas as pd
from stability_sdk import client
import stability_sdk.interfaces.gooseai.generation.generation_pb2 as generation
import getpass, os
from PIL import Image
import io

stability_api = client.StabilityInference(
    key="sk-SHPchWXM0utvDHDzHx3GsVBHVZDOgVvNQbJOuyxPa9z9ne70",
    verbose=True,
)

co = cohere.Client("Poc7e6ygMiSArhWVvxr6igd1wWHhKUWY2b1n3xuL")

# def generate(
#     prompt,
#     model="base",
#     num_generations=3,
#     temperature=0.7,
#     max_tokens=100,
#     stop_sequences=["<end>"],
# ):
#     prediction = co.generate(
#         model=model,
#         prompt=prompt,
#         return_likelihoods="GENERATION",
#         stop_sequences=stop_sequences,
#         max_tokens=max_tokens,
#         temperature=temperature,
#         num_generations=num_generations,
#     )

#     # Get list of generations
#     gens = []
#     likelihoods = []
#     for gen in prediction.generations:
#         gens.append(gen.text)

#         sum_likelihood = 0
#         for t in gen.token_likelihoods:
#             sum_likelihood += t.likelihood
#         # Get sum of likelihoods
#         likelihoods.append(sum_likelihood)

#     pd.options.display.max_colwidth = 200
#     # Create a dataframe for the generated sentences and their likelihood scores
#     df = pd.DataFrame({"generation": gens, "likelihood": likelihoods})
#     # Drop duplicates
#     df = df.drop_duplicates(subset=["generation"])
#     # Sort by highest sum likelihood
#     df = df.sort_values("likelihood", ascending=False, ignore_index=True)

#     return df

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


def generate_image(image_prompt):
    # the object returned is a python generator
    answers = stability_api.generate(prompt=image_prompt)
    # iterating over the generator produces the api response
    for resp in answers:
        for artifact in resp.artifacts:
            # if artifact.finish_reason == generation.FILTER:
            #     warnings.warn(
            #         "Your request activated the API's safety filters and could not be processed."
            #         "Please modify the prompt and try again."
            #     )
            if artifact.type == generation.ARTIFACT_IMAGE:
                img = Image.open(io.BytesIO(artifact.binary))
                img.save(image_prompt + ".jpg")

result = generate(prompt("Leather Biker Jacket"))
print("1: {}".format(result.split('\n')[0]))
print("2: {}".format(result.split('\n')[1]))

generate_image(result.split('\n')[0])