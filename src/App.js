import { useEffect, useState } from "react";

import { DEFAULTS } from "./Defaults";
import { getRandomItem } from "./RandomUtils";

import "./App.css";

async function fetchRecipes(input) {
  return await fetch("http://localhost:5000/recipes?" + input);
}

export default function App() {

  const [message, setMessage] = useState("");

  const [projects, setProjects] = useState(() => {
    const storedProjects = localStorage.getItem("projects");
    return storedProjects ? JSON.parse(storedProjects) : [];
  });

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  let [name, setName] = useState("");

  function handleSearchClick() {
    if (!name || !name.trim()) {
      return;
    }
    setProjects((prevProjects) => [...prevProjects, {name}]);
    fetchRecipesAndUpdate();
  }

  const handleProvideIngredientsClick = () => {
    setName(getRandomItem(DEFAULTS));
  };

  const fetchRecipesAndUpdate = async () => {
    let response = await fetchRecipes(name);
    setMessage(await response.text());
  };

  const projectMapper = (project) => {
    return (
      <div
        className="project"
        onClick={() => {
          const searchInput = document.querySelector(".search");
          searchInput.value = project.name;
          setName(project.name);
        }}
      >
        <p>{project.name}</p>
      </div>
    );
  };

  function parse(data) {
    try {
      const trimmedString = data.trim();
      const jsonArray = JSON.parse(trimmedString);
      return jsonArray;
    } catch (error) {
      console.error("Invalid input string format. Please provide a valid JSON array.");
      return [];
    }
  }

  function foo(input) {
    let x = [];
    let i = 1;
    for (let element of input) {
      x.push(
        <>
          <div>
            <span>{i}</span>
            &nbsp;
            {element}
          </div>
          <br />
        </>
      );
      i++;
      }
    return x;
  }

  const handleClearStorageClick = () => {
    localStorage.clear();
    setProjects([]);
  };

  return (
    <div className="App">
      <div className="shape" style={{ left: 0, top: -90 }}></div>
      <div className="shape" style={{ right: 250, top: -170 }}></div>
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
          placeholder="Enter some ingredients here..."
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <button
          className="button2 search-button"
          onClick={handleSearchClick}
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
        <div className="results">{foo(parse(message))}</div>
        {/* <div className="results">{message}</div> */}
      </div>
    </div>
  );
}
