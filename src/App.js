import { useEffect, useRef, useState } from "react";

import { PulseLoader } from "react-spinners";

import { EXAMPLES } from "./Examples";
import { getRandomItem } from "./RandomUtils";

import "./App.css";

function defaultMessage() {
  return (
    <div style={{
      width: "200px",
      margin: "10px auto", userSelect: "none", padding: "10px", color: "#bcbcbc", fontStyle: "italic", fontFamily: "monospace", fontSize: "15px" }}>
      froogle
    </div>
  )
}

function TimeoutMessage() {
  return (
    <div style={{ width: "90%" }}>
      Oh no, something went wrong. We are unable to process your request at the moment. Please try again later.
    </div>
  )
}

function errorMessage() {
  return (
    <div style={{
      width: "90%"}}>
      Error: Recipes cannot be generated for the provided ingredients. Please check your input and try again.
    </div>
  )
}

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const inputRef = useRef(null);

  const [message, setMessage] = useState(defaultMessage);

  const [isLoading, setIsLoading] = useState(false);

  const [searchHistory, setSearchHistory] = useState(() => {
    const searchHistory = localStorage.getItem("searchHistory");
    return searchHistory ? JSON.parse(searchHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  function handleSearchClick() {
    if (!searchInput || !searchInput.trim()) {
      return;
    }
    setSearchHistory((prevSearchHistory) => [...prevSearchHistory, { searchInput }]);
    fetchRecipesAndUpdate();
  }

  const handleProvideIngredientsClick = () => {
    setSearchInput(getRandomItem(EXAMPLES));
  };

  const fetchRecipesAndUpdate = async () => {
    setIsLoading(true);
    const timeoutPromise = new Promise(() => {
      setTimeout(() => {
        setIsLoading(false);
        setMessage(TimeoutMessage);
        return;
      }, 12000);
    });
    const fetchPromise = fetch("http://localhost:5000/recipes?" + searchInput);
    let response = await Promise.race([fetchPromise, timeoutPromise]);
    let text = await response.text();
    let results = parse(text);
    setIsLoading(false);
    if (results.length === 0) {
      setMessage(errorMessage);
    } else {
      setMessage(foo(results));
    }
  };

  const projectMapper = (project) => {
    return (
      <div
        className="project"
        onClick={() => {
          setSearchInput(project.searchInput);
        }}
      >
        <p>{project.searchInput}</p>
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
          <div className="rid">{i + 1}</div>
          <div>{element}</div>
        </div>
      );
    }
    return output;
  };

  const clearInput = ()=> {
    setSearchInput("");
    inputRef.current.focus();
  }

  const handleChange = (e) => {
    setSearchInput(e.target.value);
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

      <h1 className="logo">
        froogle
      </h1>
      <p className="slogan">The home for recipe ideas</p>

      <div className="input-wrapper">
        <input
          placeholder="Enter some ingredients here..."
          value={searchInput}
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

      <div>
        <button className="button2" onClick={handleProvideIngredientsClick}>
          Try Example
        </button>
        <button className="button2" onClick={handleClearStorageClick}>
          Clear History
        </button>
      </div>

      <div className="history-wrapper">
        <p>Search history</p>
        <div className="history">
          {searchHistory.map(projectMapper)}
        </div>
      </div>

      <div className="results">
        <p>Results</p>
        { isLoading ? <PulseLoader color="#999" /> : message }
      </div>
    </div>
  );
}
