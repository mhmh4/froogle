import logo from "./logo.svg";
import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

import { DEFAULTS } from "./Defaults";
import { getRandomItem } from "./RandomUtils";
import "./Defaults";
import "./App.css";

const defaultFoods = [];

const projectMapper = (project) => {
  return (
    <div
      className="project"
      onClick={() => {
        const searchInput = document.querySelector(".search");
        searchInput.value = project.name;
      }}
    >
      <p>{project.name}</p>
    </div>
  );
};

async function fetchRecipes(input) {
  console.log("name=" + input);
  return await fetch(`http://localhost:5000/recipes?${input}`);
}

export default function App() {
  const [message, setMessage] = useState("");
  const [projects, setProjects] = useState(() => {
    const storedProjects = localStorage.getItem("projects");
    return storedProjects ? JSON.parse(storedProjects) : [...defaultFoods];
  });

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  let [name, setName] = useState(() => {
    return localStorage.getItem("name") || "";
  });

  const handleProvideIngredientsClick = () => {
    setName(getRandomItem(DEFAULTS));
  };

  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);

  const fetchRecipesAndUpdate = async () => {
    let response = await fetchRecipes(name);
    setMessage(await response.text());
  };

  function parse(data) {
    console.log(data);
    console.log(typeof data);
    data = data.substring(2, data.length - 3);
    let x = data.split(`","`);
    console.log(x);
    return x;
  }

  function foo(input) {
    let x = [];
    input.forEach((element) => {
      x.push(
        <>
          <div>{element}</div>
          <br />
        </>
      );
    });
    return x;
  }

  const handleClearStorageClick = () => {
    localStorage.clear();
    setProjects([...defaultFoods]);
  };

  return (
    <div className="App">
      <div className="shape" style={{ left: 0, top: -90 }}></div>
      <div
        className="shape"
        style={{ right: -10, top: 100, borderRadius: "50%" }}
      ></div>
      <div className="shape" style={{ left: 30, top: 440 }}></div>
      <div style={{ textAlign: "center" }}>
        <div className="heading">
          <h1 className="logo" title="The home of recipe ideas">
            froogle
          </h1>
          <p>The home of recipe ideas</p>
        </div>
        <input
          className="search"
          type="text"
          placeholder="Enter some ingredients here..."
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <button
          className="button2 search-button"
          onClick={() => {
            if (!name || !name.trim()) return;
            let _projects = [...projects];
            _projects.push({
              name: name,
            });
            setProjects(_projects);
            fetchRecipesAndUpdate();
          }}
        >
          Search
        </button>
        <div>
          <button
            className="button2"
            onClick={handleProvideIngredientsClick}
            value={name}
          >
            Try Example
          </button>
          <button className="button2" onClick={handleClearStorageClick}>
            Clear History
          </button>
        </div>
        <div className="history">{projects.map(projectMapper)}</div>
        <div>{foo(parse(message))}</div>
      </div>
    </div>
  );
}
