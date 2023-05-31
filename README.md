# 🥑 froogle

<img src="images/screenshot.png">

## Introduction

froogle is an application that uses AI to give recipe ideas from ingredients you provide.

<!-- ## Background -->

<!-- ... -->

## What we learned

- ✨ Gained valuable experience in teamwork
- ⚙ Learned how to use React, Chat OpenAI API, Python, and React Hooks
- Learned how to link these technologies together to create a functional platform that provides personalized recipe recommendations
- Honed skills in researching and selecting the right images for recipes
- Overall, this project was an excellent learning opportunity that helped us grow as developers.

## What could be next for froogle?

If everyone lived like the United States, we would need 4.2 Earth to sustain the current consumption rate.

Our website not only helps you cook better meals but also reduces food waste and helps you better plan ahead. We want to add:

- More visual experience like videos and photo tutorials using APIs
- Ability to scan QR codes to save what you have locally so you can click to add different ingredients on a mix together
- Notification feature to tell the user when food will expire after certain days of scanner
- Maps to show closest shelters food banks to donate

## Installation

https://openai.com/

Create a `.env` file within the `api` directory. In that file, add your OpenAI API key in a variable named `OPENAI_API_KEY`, like so:

```
OPENAI_API_KEY=your-api-key-here
```

```
pip install -r requirements.txt
```

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

## License

MIT
