import os
import openai

from flask import Flask

app = Flask(__name__)

def getkey():
  with open("secrets/key.txt") as f:
    return f.read()


openai.api_key = getkey()

completion = openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "user", "content": "I'll give ingredients, give me recipes, just list the recipe names as a numerical list, don't output anything else"},
    {"role": "user", 
     "content": "Chicken, Yams"},

  ]
)
response = completion.choices[0].message.content

print(response)

