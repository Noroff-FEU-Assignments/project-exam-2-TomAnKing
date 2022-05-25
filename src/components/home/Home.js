import headerImage from "../images/bergenHeader.jpg";
import React from "react";
import SearchBar from "./SearchBar";
import InfoCard from "./InfoCard";
import FeaturedAccommotadions from "./FeaturedAccommodations";

function Home({ hotels }) {
  return (
    <>
      <div className="headerContainer">
        <h1 className="headerText">Welcome To Holidaze</h1>
        <img src={headerImage} className="headerImg" alt="picture of bergen" />
        <SearchBar placeholder="Searh accommodations" hotels={hotels} />
      </div>
      <div className="container">
        <InfoCard />
        <FeaturedAccommotadions hotels={hotels} />
      </div>
    </>
  );
}

export default Home;
