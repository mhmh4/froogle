import { useEffect, useState } from "react";

import { DEFAULTS } from "./Defaults";
import { getRandomItem } from "./RandomUtils";

import "./App.css";

async function fetchRecipes(input) {
  return await fetch("http://localhost:5000/recipes?" + input);
}

function defaultMessage() {
  return (
    <div style={{
      width: "200px",
      margin: "10px auto", userSelect: "none", padding: "10px", color: "#bcbcbc", fontStyle: "italic", fontFamily: "monospace", fontSize: "15px" }}>
      froogle
    </div>
  )
}

export default function App() {
  const [message, setMessage] = useState(defaultMessage);

  const [searchHistory, setSearchHistory] = useState(() => {
    const searchHistory = localStorage.getItem("searchHistory");
    return searchHistory ? JSON.parse(searchHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  let [name, setName] = useState("");

  function handleSearchClick() {
    if (!name || !name.trim()) {
      return;
    }
    setSearchHistory((prevSearchHistory) => [...prevSearchHistory, { name }]);
    fetchRecipesAndUpdate();
  }

  const handleProvideIngredientsClick = () => {
    setName(getRandomItem(DEFAULTS));
  };

  const fetchRecipesAndUpdate = async () => {
    let response = await fetchRecipes(name);
    let text = await response.text();
    setMessage(foo(parse(text)));
  };

  const projectMapper = (project) => {
    return (
      <div
        className="project"
        onClick={() => {
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
      console.error(
        "Invalid input string format. Please provide a valid JSON array."
      );
      return [data];
    }
  }

  let foo = (input) => {
    let output = [];
    for (const [i, element] of input.entries()) {
      output.push(
        <div className="recipe">
          <div class="rid">{i + 1}</div>
          <div>{element}</div>
        </div>
      );
    }
    return output;
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleClearStorageClick = () => {
    localStorage.clear();
    setSearchHistory([]);
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
      <h1 className="logo">
        froogle
      </h1>
      <p class="slogan">The home for recipe ideas</p>
      <input
        className="search"
        placeholder="Enter some ingredients here..."
        value={name}
        onChange={handleChange}
      />
      <button className="button2 search-button" onClick={handleSearchClick}>
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
      <div className="history-wrapper">
        <p>Search history</p>
        <div className="history">
          { searchHistory.map(projectMapper) }
        </div>
      </div>
      <div className="results">
        <p>Results</p>
        {(message)}
      </div>
    </div>
  );
}
