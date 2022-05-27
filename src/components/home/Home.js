import headerImage from "../images/bergenHeader.jpg";
import React from "react";
import SearchBar from "./SearchBar";
import InfoCard from "./InfoCard";
import FeaturedAccommotadions from "./FeaturedAccommodations";
import Head from "../layout/Head";

function Home({ hotels }) {
  return (
    <>
      <Head title={"Welcome To Holidaze"} />
      <div className="headerContainer">
        <h1 className="headerText">Welcome To Holidaze</h1>
        <img src={headerImage} className="headerImg" alt="bergen" />
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
