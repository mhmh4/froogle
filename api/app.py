import os

import dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

dotenv.load_dotenv()
openai.api_key = os.environ.get("OPENAI_API_KEY")


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
    return recipe_names


@app.route("/recipes")
def generate_recipes():
    query_string = str(request.query_string)
    response = call_chatgpt_api(query_string)
    return jsonify(response)


if __name__ == "__main__":
    app.run()
