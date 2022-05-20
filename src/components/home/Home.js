import headerImage from "../images/bergenHeader.jpg";
import React from "react";
import SearchBar from "./SearchBar";

function Home({ hotels }) {
  return (
    <>
      <div className="headerContainer">
        <h2 className="headerText">Welcome To Holidaze</h2>
        <img src={headerImage} className="headerImg" alt="picture of bergen" />
        <SearchBar placeholder="Searh accommodations" hotels={hotels} />
      </div>
      <div className="container">
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
        <h1>test</h1>
      </div>
    </>
  );
}

export default Home;
