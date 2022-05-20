export default function SearchedItem({ hotel }) {
  const starsArray = [
    <p></p>,
    <p>&#x2605;</p>,
    <p>&#x2605; &#x2605;</p>,
    <p>&#x2605; &#x2605; &#x2605;</p>,
    <p>&#x2605; &#x2605; &#x2605; &#x2605;</p>,
    <p>&#x2605; &#x2605; &#x2605; &#x2605; &#x2605;</p>,
  ];

  return (
    <div className="searchedHotel">
      <img className="hotelImg" src={hotel.acf.image} />
      <div className="middle">
        <h2 className="hotelTitle">{hotel.title.rendered}</h2>
        <div className="stars"> {starsArray[hotel.acf.stars]}</div>
      </div>
      <p className="hotelPrice">
        From <span className="priceSpan">${hotel.acf.price}</span> per night
      </p>
    </div>
  );
}
