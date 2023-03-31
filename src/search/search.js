import React, { useState } from "react";
import "./Search.css";
import data from "./drug1.json";
import debounce from "lodash/debounce";

export function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const debouncedFilter = debounce(filterResults, 700);

  function filterResults(value) {
    if (value === "") {
      setResults([]);
    } else {
      setResults(
        data.fields.filter(
          (field) =>
            field.label.toLowerCase().includes(value.toLowerCase()) ||
            field.type.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  }

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    debouncedFilter(value);
    setSelected(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log("Selected:", results[0]);
      setQuery("");
      setResults([]);
    }
  };

  const handleOptionClick = (option) => {
    console.log("Selected:", option);
    setSelected(option);
    setQuery("");
    setResults([]);
  };

  return (
    <div className="main">
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <div className="list">
        {results.length > 0 && (
          <ul>
            {results.map((result) => (
              <div key={result.key} onClick={() => handleOptionClick(result)}>
                {result.label}
              </div>
            ))}
          </ul>
        )}

        <p>{selected ? JSON.stringify(selected) : null}</p>
      </div>
    </div>
  );
}
