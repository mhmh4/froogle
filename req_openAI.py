import os
import openai

try: #goes into the folder of secret
    os.chdir("secrets1") #we access the folder named 'secrets' that has the passwords 
except FileNotFoundError:
    pass

def bot_pass():
    with open("openai.txt") as f:
        return f.read()

openai.api_key = os.getenv(bot_pass())

completion = openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=[
    {"role": "user", "content": "Tell the world about the ChatGPT API in the style of a pirate."}
  ]
)

print(completion.choices[0].message.content)
