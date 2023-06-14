# 🥑 froogle

<img src="images/screenshot.png">

## Introduction

froogle is an application gives recipe ideas from ingredients you provide. The purpose of this project is to strictly give ideas for what to cook as opposed to giving actual recipes which one can easily find with a quick search.

## Background

We've first started this project at a hackathon. There wasn't any single required theme, but one recommendation was to make something based on the topic of food. Having that topic in mind and knowing that there is an API available to interact with ChatGPT, we eventually came up with the idea for this app.

## What could be next for froogle?

...

<!-- If everyone lived like the United States, we would need 4.2 Earth to sustain the current consumption rate.

- More visual experience like videos and photo tutorials using APIs
- Ability to scan QR codes to save what you have locally so you can click to add different ingredients on a mix together
- Notification feature to tell the user when food will expire after certain days of scanner
- Maps to show closest shelters food banks to donate -->

## Installation

Before even getting into the installation process, you'll first need an API key from [OpenAI](https://openai.com/) which you can get [using this link](https://platform.openai.com/account/api-keys). Note, you'd first need to create an account if you don't have one already.

This project requires Python and Node.js, so make sure to have those installed as well.

To begin, first, clone the repository.

```
git clone https://github.com/mhmh4/froogle.git
```

Create a `.env` file within the `api` directory. In that file, add your OpenAI API key in a variable named `OPENAI_API_KEY`, like so:

```
OPENAI_API_KEY=your-api-key-here
```

Next, still in the `api` directory, install the required Python packages (use a virtual environment if you're feeling best practice-y).

```
pip install -r requirements.txt
```

Finally, back in the project's root directory, install the required npm packages.

```
npm install
```

## Usage

To begin, have two terminals open that are both within the repository's root directory.

In one terminal, navigate to the `api` directory (activate your virtual environment if you're using one), then run the following Flask command:

```
flask run
```

In the other terminal, simply run the npm `start` script.

```
npm run start
```

Lastly, open a web browser and navigate to `http://localhost:3000` to see the application.
