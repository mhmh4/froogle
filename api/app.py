import os

import dotenv
import flask
import flask_cors
import openai

app = flask.Flask(__name__)
app.config["CORS_HEADERS"] = "Content-Type"

cors = flask_cors.CORS(app)

dotenv.load_dotenv()
openai.api_key = os.environ.get("OPENAI_API_KEY")


def is_valid_data(data):
    INVALID_STRINGS = frozenset(["sorry", "invalid", "valid", "provide", "ingredients", "model", "assist", "unable"])
    for d in data:
        tokens = d.split()
        for t in tokens:
            if t in INVALID_STRINGS:
                return False
    return True


def call_api(input):
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": "I'll give ingredients, give me recipes, just list the recipe names as a numerical list, don't output anything else"},
            {"role": "user", "content": f"Here are the ingredients: {input}. List recipes, just list the recipe names, nothing else"},
        ]
    )
    recipe_names = completion.choices[0].message.content
    recipe_names = recipe_names.split("\n")

    if not is_valid_data(recipe_names):
        return []

    for i in range(len(recipe_names)):
        recipe_names[i] = recipe_names[i][3:]

    return recipe_names


@app.get("/recipes")
def recipes():
    query_string = str(flask.request.query_string)
    response = call_api(query_string)
    return flask.jsonify(response)
