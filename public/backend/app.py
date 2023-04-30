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
    return (completion.choices[0].message.content)
    # print(completion.choices)



@app.route("/recipes")
def generate_recipes():
    query_string = str(request.query_string)
    text = call_chatgpt_api(query_string)
    recipes = text.split("\n")  # split recipes into a list
    image_urls = [get_image_url(recipe) for recipe in recipes]  # get image URL for each recipe
    result = ""  # initialize the result string
    for image_url, recipe in zip(image_urls, recipes):
        result += image_url + "\n" + recipe + "\n\n"  # add image URL and recipe to result with line breaks
    return result

def main():
    ...

if __name__ == "__main__":
    main()
