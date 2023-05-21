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
    <>
      <br />
      <div
        className="project"
        onClick={() => {
          const searchInput = document.querySelector(".search");
          searchInput.value = project.name;
        }}
      >
        <p>{project.name}</p>
      </div>
    </>
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
    console.log(typeof(data));
    data = data.substring(2, data.length - 3);
    let x = data.split(`","`)
    console.log(x);
    return x;
  }

  function foo(input) {
    let x = [];
    input.forEach(element => {
      x.push(
        <>
          <div>
            {element}
          </div>
          <br />
        </>
      );
    });
    return x;
  }

  const btnStyle = {
    fontSize: 16,
    color: "white",
    backgroundColor: "#013220",
    borderRadius: "6px",
    border: 0,
    padding: 10,
    margin: "0 10px",
    cursor: "pointer",
    width: 190,
  };

  const handleClearStorageClick = () => {
    localStorage.clear();
    setProjects([...defaultFoods]);
  };

  return (
    <div className="App">
      <div
        style={{
          height: "200px",
          width: "200px",
          rotate: "30deg",
          zIndex: -1,
          backgroundColor: "green",
          opacity: 0.05,
          position: "absolute",
          left: 0,
          top: -90,
        }}
      ></div>
      <div
        style={{
          height: "200px",
          width: "200px",
          rotate: "30deg",
          zIndex: -1,
          backgroundColor: "green",
          opacity: 0.05,
          position: "absolute",
          right: -10,
          top: 100,
          borderRadius: "50%",
        }}
      ></div>
      <div
        style={{
          height: "500px",
          width: "500px",
          rotate: "30deg",
          zIndex: -1,
          backgroundColor: "green",
          opacity: 0.05,
          position: "absolute",
          left: 10,
          top: 400,
        }}
      ></div>
      <div>
        <div style={{ textAlign: "center" }}>
          <div className="heading">
            <h1 className="logo" title="The home of recipe ideas">
              froogle
            </h1>
            <p>The home of recipe ideas</p>
          </div>
          <input
            className="search"
            style={{
              marginBottom: "20px",
              width: "26em",
              height: 15,
              backgroundColor: "#eee",
              border: "2px solid #eee",
              padding: "18px 20px",
              borderTopLeftRadius: 13,
              borderBottomLeftRadius: 13,
              fontSize: 16,
            }}
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
            <button
              className="button2"
              onClick={handleClearStorageClick}
            >
              Clear History
            </button>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: "center" }}>
        <div
          style={{
            marginTop: 20,
            display: "flex",
            minHeight: 70,
            width: "35em",
            overflowX: "scroll",
            backgroundColor: "#eee",
            borderRadius: "10px",
            border: "1px solid #e0e0e0"
          }}
        >
          {projects.map(projectMapper)}
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        {foo(parse(message))}
      </div>
    </div>
  );
}
