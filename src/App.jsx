import { useEffect, useRef, useState } from "react";

import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import { PulseLoader } from "react-spinners";
import random from "random";

import { EXAMPLES } from "./Examples";

import "./App.css";

function Error({ message }) {
  return <div className="error">{"Error: " + message}</div>;
}

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const inputRef = useRef(null);

  const [message, setMessage] = useState();

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
    fetchRecipesAndUpdate();
  }

  const handleProvideIngredientsClick = () => {
    setSearchInput(random.choice(EXAMPLES));
  };

  const fetchRecipesAndUpdate = async () => {
    let timeoutId;
    setIsLoading(true);
    const timeoutPromise = new Promise(() => {
      timeoutId = setTimeout(() => {
        setIsLoading(false);
        setMessage(
          <Error message="We're unable to process your request at the moment. Please try again later."></Error>,
        );
        return;
      }, 12000);
    });
    const fetchPromise = fetch("http://localhost:5000/recipes?" + searchInput);
    let response = await Promise.race([fetchPromise, timeoutPromise]);
    clearTimeout(timeoutId);
    let text = await response.text();
    let results = JSON.parse(text);
    setIsLoading(false);
    if (results.length === 0) {
      setMessage(
        <Error message="Recipes cannot be generated for the provided ingredients. Please check your input and try again."></Error>,
      );
    } else {
      setSearchHistory((prevSearchHistory) => [
        ...prevSearchHistory,
        { searchInput },
      ]);
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

  let foo = (input) => {
    let output = [];
    for (const [i, element] of input.entries()) {
      output.push(
        <div className="recipe">
          <div className="rid">{i + 1}</div>
          <div>{element}</div>
        </div>,
      );
    }
    return output;
  };

  const clearInput = () => {
    setSearchInput("");
    inputRef.current.focus();
  };

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
      <div
        className="shape"
        style={{ right: -10, top: 100, borderRadius: "50%" }}
      ></div>
      <div className="shape" style={{ left: 30, top: 440 }}></div>

      <h1 className="logo">froogle</h1>
      <p className="slogan">The home for recipe ideas</p>

      <div className="input-wrapper">
        <span className="one">
          <HiMagnifyingGlass
            style={{
              fontSize: "20px",
              zIndex: 0,
              top: 4.5,
              left: 5,
              position: "relative",
              color: "#aaa",
            }}
          />
        </span>
        <input
          placeholder="Enter some ingredients here..."
          value={searchInput}
          onChange={handleChange}
          ref={inputRef}
          autoFocus
        />
        <span className="two">
          <button
            className="clear-input-button"
            onClick={clearInput}
            style={{
              visibility: searchInput.length == 0 ? "hidden" : "unset",
            }}
          >
            <HiXMark
              style={{ fontSize: "22px", position: "relative", top: 1.5 }}
            />
          </button>
        </span>
        <span
          tabIndex={0}
          className="search-button"
          onClick={handleSearchClick}
        >
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
        <div className="history">{searchHistory.map(projectMapper)}</div>
      </div>

      <div className="results">
        <p>Results</p>
        <div class="results-list">
          {isLoading ? <PulseLoader color="#bbb" /> : message}
        </div>
      </div>
    </div>
  );
}
