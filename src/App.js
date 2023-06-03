import { useEffect, useRef, useState } from "react";

import { PulseLoader } from "react-spinners";

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

  const [isLoading, setIsLoading] = useState(false);

  const [searchHistory, setSearchHistory] = useState(() => {
    const searchHistory = localStorage.getItem("searchHistory");
    return searchHistory ? JSON.parse(searchHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  let [name, setName] = useState("");
  const inputRef = useRef(null);

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
    setIsLoading(true);
    let response = await fetchRecipes(name);
    let text = await response.text();
    setIsLoading(false);
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
      return [];
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

  const clearInput = ()=> {
    setName("");
    inputRef.current.focus();
  }

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
      <div className="shape" style={{ right: -10, top: 100, borderRadius: "50%" }}></div>
      <div className="shape" style={{ left: 30, top: 440 }}></div>
      {/* =========================================== */}
        <h1 className="logo">
          froogle
        </h1>
        <p class="slogan">The home for recipe ideas</p>
      {/* =========================================== */}
      <div className="input-wrapper">
        <input
          placeholder="Enter some ingredients here..."
          value={name}
          onChange={handleChange}
          ref={inputRef}
        />
        <span className="two">
          <button onClick={clearInput}>X</button>
        </span>
        <span className="search-button" onClick={handleSearchClick}>
          Search
        </span>
      </div>
      {/* =========================================== */}
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
      {/* =========================================== */}
      <div className="history-wrapper">
        <p>Search history</p>
        <div className="history">
          {searchHistory.map(projectMapper)}
        </div>
      </div>
      {/* =========================================== */}
      <div className="results">
        <p>Results</p>
        { isLoading
        ? <PulseLoader color="#999" />
        : message }
      </div>
    </div>
  );
}
