import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchedItem from "./SearchedItem";

function SearchBar({ placeholder, hotels }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = hotels.filter((value) => {
      return value.title.rendered
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  return (
    <div className="searchBar">
      <div className="searchInputs">
        <input
          type="text"
          className="searchInput"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.map((value) => {
            return (
              <Link to={`accommodations/${value.id}`} key={value.id}>
                <SearchedItem hotel={value} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
