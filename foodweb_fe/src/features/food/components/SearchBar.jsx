import React, { useState } from "react";

import {
  FaSearch,
  FaTimes
} from "react-icons/fa";

const SearchBar = ({ onSearch }) => {

  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {

    const value = e.target.value;

    setKeyword(value);

    onSearch(value);

  };

  /* Clear search */

  const handleClear = () => {

    setKeyword("");

    onSearch("");

  };

  return (

    <div className="search-box">

      {/* Search icon */}

      <FaSearch className="search-icon" />

      {/* Input */}

      <input
        type="text"
        placeholder="Search delicious food..."
        value={keyword}
        onChange={handleChange}
      />

      {/* Clear button */}

      {keyword && (

        <FaTimes
          className="clear-icon"
          onClick={handleClear}
        />

      )}

    </div>

  );
};

export default SearchBar;