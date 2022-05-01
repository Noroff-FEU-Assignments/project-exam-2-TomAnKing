import headerImage from "../images/headerBergen.jpg";
import React, { useState } from "react";

function Home({ hotels }) {
  return (
    <>
      <div className="container">
        <img src={headerImage} className="headerImg" />
        <h1>test</h1>
        {hotels.map((hotel) => {
          return (
            <div className="hotel" key={hotel.id}>
              <h1>{hotel.title.rendered}</h1>
              <p>{hotel.acf.price}</p>
              <img src={hotel.acf.image} />
            </div>
          );
        })}
      </div>
      <div className="hotel"></div>
    </>
  );
}

export default Home;
