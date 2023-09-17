import cohere
import pandas as pd

co = cohere.Client('Poc7e6ygMiSArhWVvxr6igd1wWHhKUWY2b1n3xuL')

def generate(prompt, model="base", num_generations=5, temperature=0.7, max_tokens=50, stop_sequences=['<end>']):
  prediction = co.generate(
    model=model,
    prompt=prompt,
    return_likelihoods = 'GENERATION',
    stop_sequences=stop_sequences,
    max_tokens=max_tokens,
    temperature=temperature,
    num_generations=num_generations)
  
  # Get list of generations
  gens = []
  likelihoods = []
  for gen in prediction.generations:
      gens.append(gen.text)
      
      sum_likelihood = 0
      for t in gen.token_likelihoods:
          sum_likelihood += t.likelihood
      # Get sum of likelihoods
      likelihoods.append(sum_likelihood)

  pd.options.display.max_colwidth = 200
  # Create a dataframe for the generated sentences and their likelihood scores
  df = pd.DataFrame({'generation':gens, 'likelihood': likelihoods})
  # Drop duplicates
  df = df.drop_duplicates(subset=['generation'])
  # Sort by highest sum likelihood
  df = df.sort_values('likelihood', ascending=False, ignore_index=True)
  
  return df

print(generate("I have a Lingua Franca Old School embroidered cashmere sweater, please suggest matching pants and shoes."))