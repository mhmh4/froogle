import os
import openai
import json

try: #goes into the folder of secret
    os.chdir("secrets") #we access the folder named 'secrets' that has the passwords 
except FileNotFoundError:
    pass

def bot_pass():
    with open("openai.txt") as f:
        return f.read()

def res():
    with open("input.txt") as f:
        return f.read()

# print (bot_pass())

openai.api_key = (bot_pass())

completion = openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "user", "content": res()}
  ]
)

output_dict = {"response": completion.choices[0].message.content}

with open('output.json', 'a') as f:
    json.dump(completion.choices[0].message.content, f)
    f.write('\n')
# print(completion.choices[0].message.content)
