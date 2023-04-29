import os
import openai

from flask import Flask

app = Flask(__name__)

openai.organization = "YOUR_ORG_ID"
# openai.api_key = os.getenv("OPENAI_API_KEY")
openai.api_key = "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"
openai.Model.list()

openai.Completion.create(
  model="text-davinci-003",
  prompt="Say this is a test",
  max_tokens=7,
  temperature=0
)
