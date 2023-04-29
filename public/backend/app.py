import os
import openai

from flask import Flask

app = Flask(__name__)

openai.organization = "org-j4zwDScvVmoK6QRr70fOQ42Z"
# openai.api_key = os.getenv("OPENAI_API_KEY")
openai.api_key = "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"
openai.Model.list()

openai.Completion.create(
  model="text-davinci-003",
  prompt="Say this is a test",
  # max_tokens=7,
  # temperature=0
)
