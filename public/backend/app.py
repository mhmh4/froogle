from flask import Flask, request, jsonify

from flask_cors import CORS, cross_origin
import openai

app = Flask(__name__)


cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def getkey():
    with open("secrets/key.txt") as f:
        return f.read()

openai.api_key = getkey()


def call_chatgpt_api(input):
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": "I'll give ingredients, give me recipes, just list the recipe names as a numerical list, don't output anything else"},
            {"role": "user", "content": f"Here are the ingredients: {input}. List recipes, just list the recipe names"},
        ]
    )
    return (completion.choices[0].message.content)
    # print(completion.choices)

@app.route("/recipes")
def generate_recipes():
    query_string = str(request.query_string)
    print(query_string)
    return call_chatgpt_api(query_string)

def main():
    call_chatgpt_api()

if __name__ == "__main__":
    main()
