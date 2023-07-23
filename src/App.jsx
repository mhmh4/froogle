import { useEffect, useRef, useState } from "react";

import { PulseLoader } from "react-spinners";
import random from "random";

import { EXAMPLES } from "./Examples";
import { SearchBar } from "./SearchBar";
import { ErrorMessage } from "./ErrorMessage";

import "./App.css";

export default function App() {
  const [searchInput, setSearchInput] = useState("");

  const [searchHistory, setSearchHistory] = useState(() => {
    const searchHistory = localStorage.getItem("searchHistory");
    return JSON.parse(searchHistory) ?? [];
  });
  const historyRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [results, setResults] = useState([]);

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

  const handleClearStorageClick = () => {
    localStorage.clear();
    setSearchHistory([]);
  };

  const handleSearchClick = async () => {
    const isWhitespace = !searchInput.trim();
    if (isWhitespace) {
      return;
    }

    setResults([]);
    setErrorMessage();
    setIsLoading(true);

    let timeoutId;
    const timeoutPromise = new Promise(() => {
      timeoutId = setTimeout(() => {
        setIsLoading(false);
        setErrorMessage(
          <ErrorMessage message="We're unable to process your request at the moment. Please try again later."></ErrorMessage>
        );
        return;
      }, 10000);
    });
    const fetchPromise = fetch("http://localhost:5000/recipes?" + searchInput);

    let response = await Promise.race([fetchPromise, timeoutPromise]);
    clearTimeout(timeoutId);
    let text = await response.text();
    let recipes = JSON.parse(text);
    setIsLoading(false);

    if (recipes.length === 0) {
      setErrorMessage(
        <ErrorMessage message="Recipes cannot be generated for the provided ingredients. Please check your input and try again."></ErrorMessage>
      );
    } else {
      setSearchHistory((prevSearchHistory) => [
        ...prevSearchHistory,
        { searchInput },
      ]);
      setResults(recipes);
    }
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

      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearchClick={handleSearchClick}
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
        <div className="results-list">
          {errorMessage}

          {isLoading && <PulseLoader className="loader" color="#bbb" />}
          {!isLoading &&
            results.map((recipe, index) => {
              return (
                <div className="recipe">
                  <div className="recipe-id">{index + 1}</div>
                  <div>{recipe}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
