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
    INVALIDATORS = [
        "assist",
        "ingredients",
        "invalid",
        "model",
        "provide",
        "sorry",
        "unable",
        "valid",
    ]
    for d in data:
        tokens = d.split()
        for t in tokens:
            if t in INVALIDATORS:
                return False
    return True


def call_openai_api(ingredients):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": f"I'll give ingredients, give me recipes, just list the recipe names as a numerical list, don't output anything else. Here are the ingredients: {ingredients}. List recipes, just list the recipe names, nothing else.",
            },
        ],
    )
    return response.choices[0].message.content.split("\n")


@app.get("/recipes")
def recipes():
    ingredients = str(flask.request.query_string)
    output = call_openai_api(ingredients)

    if not is_valid_data(output):
        return []

    for i in range(len(output)):
        output[i] = output[i][3:]  # remove prefix

    return flask.jsonify(output)
