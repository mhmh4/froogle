import { useRef } from "react";

import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";

export function SearchBar({ searchInput, setSearchInput, handleSearchClick }) {
  const inputRef = useRef(null);

  const clearInput = () => {
    setSearchInput("");
    inputRef.current.focus();
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
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
      <span tabIndex={0} className="search-button" onClick={handleSearchClick}>
        Search
      </span>
    </div>
  );
}
