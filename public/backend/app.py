from flask import Flask, request, jsonify

from flask_cors import CORS, cross_origin
import openai
import requests

def getGooglekey():
    with open("secrets/google_key.txt") as f:
        return f.read()
def getGoogleCX():
    with open("secrets/google_cx.txt") as f:
        return f.read()

def get_image_url(query):
    url = "https://www.googleapis.com/customsearch/v1"

    params = {
        "key": getGooglekey(),
        "cx": getGoogleCX(),
        "q": f"{query}",
        "searchType": "image",
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:
        results = response.json()["items"]
        if results:
            return results[0]["link"]
    return None

# print (get_image_url("mulukhiyah" ))

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
    recipe_names = completion.choices[0].message.content
    recipe_names= recipe_names.split("\n")
    for i in range(len(recipe_names)):
        # get rid of the number before the recipe name
        recipe_names[i] = recipe_names[i][3:]
    print(recipe_names)

    # recipe_names = []
    completion2 = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": f"Generate a recipe for the following dishes: {recipe_names}."}
        ]
    )
    print(completion2.choices[0].message.content)
    # return (completion.choices[0].message.content)
    return completion.choices[0].message.content


def main():
    res = call_chatgpt_api("lemon, apple, yogurt")
    print(res)


@app.route("/recipes")
def generate_recipes():
    query_string = str(request.query_string)
    print(query_string)
    return call_chatgpt_api(query_string)

main()
