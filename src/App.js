import logo from "./logo.svg";
import { About } from "./pages/about.jsx";
import { Mainapp } from "./pages/mainapp";
import { Placeholder } from "./pages/placeholder";
import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, RouterProvider, Route, Link } from "react-router-dom";

import { DEFAULTS } from "./Defaults";
import "./Defaults";
import "./App.css";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function choice(options) {
  let random_index = getRandomIntInclusive(0, options.length - 1);
  return options[random_index];
}

const router = (
  <BrowserRouter>
    <div style={{ textAlign: "center" }}>
      {/* <h1>froogle</h1> */}
      {/* <Link style={{ color: '#eee' }} to="/about"> About Us</Link> */}
      {/* &nbsp; */}
      {/* <Link style={{ color: '#eee' }} to="/mainapp"> Mainapp</Link> */}
      {/* &nbsp; */}
      {/* <Link style={{ color: '#eee' }} to="/placeholder">Placeholder</Link> */}
    </div>
  </BrowserRouter>
);

const defaultFoods = [];

const projectMapper = (project) => {
  return (
    <>
      <br />
      <div
        className="project"
        style={projectStyle}
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

const projectStyle = {
  border: "1px solid #cdcdcd",
  minWidth: "200px !impotant",
  margin: "5px 5px",
  padding: "0 10px",
  borderRadius: 12,
  // transition: "border-color 0.2s ease-in-out"
  textOverflow: "ellipsis",
  cursor: "pointer",
  padding: "0 10px",
};

const hoverProjectStyle = {
  ...projectStyle,
};

const Project = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => setIsHovered(!isHovered);

  return (
    <div
      style={isHovered ? hoverProjectStyle : projectStyle}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <p style={{ fontWeight: "bold" }}>{project.name}</p>
    </div>
  );
};

const storageArray = [];

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
    setName(choice(DEFAULTS));
  };

  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);

  const [calories, setCalories] = useState("");

  const fetchRecipesAndUpdate = async () => {
    let response = await fetchRecipes(name);
    setMessage(await response.text());
  };

  function parse(data) {
    console.log(data);
    return data;
  }

  const btnStyle = {
    fontSize: 16,
    color: "white",
    backgroundColor: "#013220",
    borderRadius: "6px",
    border: 0,
    padding: 10,
    // margin: "0 10px",
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
        <div style={{ textAlign: "center", position: "relative" }}>
          <div className="heading">
            <h1 className="logo" title="The home of recipe ideas">
              🥑 froogle
            </h1>
            <p style={{ color: "#333", margin: 0 }}>The home of recipe ideas</p>
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
            className="search-btn"
            style={{
              ...btnStyle,
              borderTopRightRadius: 13,
              borderBottomRightRadius: 13,
              padding: "18px 20px",
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              width: "100px",
              backgroundColor: "#466d1d",
            }}
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
              style={{ ...btnStyle, margin: "0 10px" }}
              onClick={handleProvideIngredientsClick}
              value={name}
            >
              Try Example
            </button>
            <button
              className="button2"
              style={{ ...btnStyle, margin: "0 10px" }}
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
          }}
        >
          {projects.map(projectMapper)}
        </div>
        <p>
          {parse(message)}
        </p>
      </div>
    </div>
  );
}
