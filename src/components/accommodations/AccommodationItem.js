export default function AccommodationItem({ hotel, styling }) {
  const starsArray = [
    <p></p>,
    <p>&#x2605;</p>,
    <p>&#x2605; &#x2605;</p>,
    <p>&#x2605; &#x2605; &#x2605;</p>,
    <p>&#x2605; &#x2605; &#x2605; &#x2605;</p>,
    <p>&#x2605; &#x2605; &#x2605; &#x2605; &#x2605;</p>,
  ];

  return (
    <div className={styling}>
      <img
        className="hotelImg"
        src={hotel.acf.image}
        alt={hotel.title.rendered}
      />
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
