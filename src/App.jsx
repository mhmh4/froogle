import { useEffect, useRef, useState } from "react";

import { PulseLoader } from "react-spinners";
import random from "random";

import { EXAMPLES } from "./Examples";

import "./App.css";
import { SearchBar } from "./SearchBar";

function Error({ message }) {
  return <div className="error">{"Error: " + message}</div>;
}

export default function App() {
  const [searchInput, setSearchInput] = useState("");

  const [message, setMessage] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const [searchHistory, setSearchHistory] = useState(() => {
    const searchHistory = localStorage.getItem("searchHistory");
    return JSON.parse(searchHistory) ?? [];
  });

  const historyRef = useRef(null);

  const scrollToBottom = () => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    scrollToBottom();
  }, [searchHistory]);

  const handleTryExampleClick = () => {
    setSearchInput(random.choice(EXAMPLES));
  };

  const fetchRecipesAndUpdate = async () => {
    let timeoutId;
    setIsLoading(true);
    const timeoutPromise = new Promise(() => {
      timeoutId = setTimeout(() => {
        setIsLoading(false);
        setMessage(
          <Error message="We're unable to process your request at the moment. Please try again later."></Error>
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
        <Error message="Recipes cannot be generated for the provided ingredients. Please check your input and try again."></Error>
      );
    } else {
      setSearchHistory((prevSearchHistory) => [
        ...prevSearchHistory,
        { searchInput },
      ]);
      setMessage(foo(results));
    }
  };

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

      {/* <div className="input-wrapper">
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
        </span
      </div> */}
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        fetchRecipesAndUpdate={fetchRecipesAndUpdate}
      />

      <div>
        <button className="button2" onClick={handleTryExampleClick}>
          Try Example
        </button>
        <button className="button2" onClick={handleClearStorageClick}>
          Clear History
        </button>
      </div>

      <div className="history-wrapper">
        <p>Search history</p>
        <div ref={historyRef} className="history">
          {searchHistory.map((historyItem) => {
            return (
              <div
                className="history-item"
                onClick={() => {
                  setSearchInput(historyItem.searchInput);
                }}
              >
                <p>{historyItem.searchInput}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="results">
        <p>Results</p>
        <div class="results-list">
          {isLoading ? (
            <PulseLoader className="loader" color="#bbb" />
          ) : (
            message
          )}
        </div>
      </div>
    </div>
  );
}
