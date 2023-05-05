from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import requests

import config

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


openai.api_key = config.OPENAI_API_KEY


def get_image_url(query):
    url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "key": config.GOOGLE_KEY,
        "cx": config.GOOGLE_CX,
        "q": f"{query}",
        "searchType": "image",
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        response_json = response.json()
        if "items" in response_json:
            results = response_json["items"]
            if results:
                return results[0]["link"]

    return None


def call_chatgpt_api(input):
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": "I'll give ingredients, give me recipes, just list the recipe names as a numerical list, don't output anything else"},
            {"role": "user", "content": f"Here are the ingredients: {input}. List recipes, just list the recipe names, nothin else"},
        ]
    )
    recipe_names = completion.choices[0].message.content
    recipe_names= recipe_names.split("\n")
    for i in range(len(recipe_names)):
        recipe_names[i] = recipe_names[i][3:]
    # print(recipe_names)
    image_urls = []
    for recipe in recipe_names:
        image_urls.append(get_image_url(recipe))
    data = []
    for a, b in zip(recipe_names, image_urls):
        data.append([a, b])
    print(data)
    return data


@app.route("/recipes")
def generate_recipes():
    query_string = str(request.query_string)
    response = call_chatgpt_api(query_string)
    return jsonify(response)


if __name__ == "__main__":
    app.run()
