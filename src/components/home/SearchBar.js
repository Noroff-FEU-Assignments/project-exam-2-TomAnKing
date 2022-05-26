import React, { useState } from "react";
import { Link } from "react-router-dom";
import AccommodationItem from "../accommodations/AccommodationItem";

function SearchBar({ placeholder, hotels }) {
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const style = "searchedHotel";

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = hotels.filter((value) => {
      return value.title.rendered
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredHotels([]);
    } else {
      setFilteredHotels(newFilter);
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
      {filteredHotels.length !== 0 && (
        <div className="dataResult">
          {filteredHotels.map((value) => {
            return (
              <Link to={`accommodations/${value.id}`} key={value.id}>
                <AccommodationItem hotel={value} style={style} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
