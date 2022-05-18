import headerImage from "../images/bergenHeader.jpg";
import React, { useState } from "react";
import SearchBar from "./SearchBar";

function Home({ hotels }) {
  return (
    <>
      <img src={headerImage} className="headerImg" />
      <div className="container">
        <SearchBar placeholder="test" hotels={hotels} />
        <h1>test</h1>
      </div>
    </>
  );
}

export default Home;
