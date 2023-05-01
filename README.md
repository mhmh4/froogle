<p align="center">
	<h1> 🥑 Froogle </h1>
</p>

## What it does
* Froogle is a website that helps users **cook better meals**.
* It uses **OpenAI API** 
* Solve food waste

Input the ingredients = outputs the recipe
----
**Demo**
Check out our demo video on YouTube: 
![Demo Video](https://img.youtube.com/vi/a0XG3CcASoI/0.jpg)](https://www.youtube.com/watch?v=a0XG3CcASoI)

## How we built it

User sends input to a site using React, the site generates prompt with OpenAI using Python, and pushes back as JSON and it gets formatted.

## Challenges we ran into

We faced several challenges during the project, including learning and integrating new technologies as it was our first time using programs such as React, JSON, JavaScript, and Flask. Connecting them all together was tedious, but we were able to make it work. Finding suitable pictures for the recipes was also a challenge, but we overcame it and found the right images, even though they were not included in the final product.

## What we learned

* ✨Gained valuable experience in teamwork
* ⚙ Learned how to use React, Chat OpenAI API, Python, and React Hooks
* Learned how to link these technologies together to create a functional platform that provides personalized recipe recommendations
* Honed skills in researching and selecting the right images for recipes
* Overall, this project was an excellent learning opportunity that helped us grow as developers.


## What's next for Froogle

If everyone lived like the United States, we would need 4.2 Earth to sustain the current consumption rate.

Our website not only helps you cook better meals but also reduces food waste and helps you better plan ahead. We want to add:

- More visual experience like videos and photo tutorials using APIs
- Ability to scan QR codes to save what you have locally so you can click to add different ingredients on a mix together
- Notification feature to tell the user when food will expire after certain days of scanner
- Maps to show closest shelters food banks to donate

## Built With
| Technology | Documentation |
| --- | --- |
| React | [reactjs.org/docs/getting-started.html][React-docs] |
| OpenAI API | [beta.openai.com/docs][OpenAI-docs] |
| Flask | [flask.palletsprojects.com/en/2.1.x][Flask-docs] |
| Google API Images | [developers.google.com/custom-search][GoogleImages-docs] |
| JavaScript | [developer.mozilla.org/JavaScript][JavaScript-docs] |
| JSON | [developer.mozilla.org/JSON][JSON-docs] |
| Python3 | [python.org/doc/][Python-docs] |


[React-docs]: https://reactjs.org/docs/getting-started.html
[OpenAI-docs]: https://beta.openai.com/docs/
[Flask-docs]: https://flask.palletsprojects.com/en/2.1.x/
[GoogleImages-docs]: https://developers.google.com/custom-search/v1/overview
[JavaScript-docs]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[JSON-docs]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
[Python-docs]: https://www.python.org/doc/

## Try it out

[GitHub Repo](https://github.com/example/froogle)
Download the files
Make secret keys directory and make following files
* key.txt //open AI access key
* google_key.txt
* google_cx.txt

Download pre-reqs for node, run flask and run front ened
```ss
cd public/frontend/hawkhack-app/src
npm run start
cd .\public\backend\
flask run

```
## License

MIT
