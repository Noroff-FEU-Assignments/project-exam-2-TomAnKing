import React, { useState } from "react";
import { Link } from "react-router-dom";
import AccommodationItem from "../accommodations/AccommodationItem";

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
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
      </div>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <Link to={`accommodations/${value.id}`} key={hotels.id}>
                <AccommodationItem hotel={value} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
