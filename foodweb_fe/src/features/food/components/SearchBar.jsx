import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {

  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {

    const value = e.target.value;

    setKeyword(value);

    onSearch(value);

  };

  return (
    <div className="search-box">

      <input
        type="text"
        placeholder="Search food..."
        value={keyword}
        onChange={handleChange}
      />

    </div>
  );
};

export default SearchBar;