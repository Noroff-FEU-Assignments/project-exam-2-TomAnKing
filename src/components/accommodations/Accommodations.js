function Accommodations({ hotels }) {
  return (
    <>
      <div className="container">
        <h1>Accommodations</h1>
        <div className="hotels">
          <div className="searchHotel">
            <h2>Search accommodations</h2>
            <input type="search" placeholder="Search..."></input>
            <h2>From</h2>
            <input type="date"></input>
            <h2>To</h2>
            <input type="date"></input>
          </div>
          {hotels.map((hotel) => {
            return (
              <div className="hotel" key={hotel.id}>
                <img className="hotelImg" src={hotel.acf.image} />
                <h2 className="hotelTitle">{hotel.title.rendered}</h2>
                <p className="hotelPrice">
                  From <span className="priceSpan">${hotel.acf.price}</span> per
                  night
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Accommodations;
