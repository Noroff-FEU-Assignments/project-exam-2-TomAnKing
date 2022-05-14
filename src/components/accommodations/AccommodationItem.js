export default function AccommodationItem({ hotel }) {
  const starsArray = [
    <p></p>,
    <p>&#x2605;</p>,
    <p>&#x2605; &#x2605;</p>,
    <p>&#x2605; &#x2605; &#x2605;</p>,
    <p>&#x2605; &#x2605; &#x2605; &#x2605;</p>,
    <p>&#x2605; &#x2605; &#x2605; &#x2605; &#x2605;</p>,
  ];

  return (
    <div className="hotel">
      <img className="hotelImg" src={hotel.acf.image} />
      <div className="middle">
        <h2 className="hotelTitle">{hotel.title.rendered}</h2>
        <p id="stars">{starsArray[hotel.acf.stars]}</p>
      </div>
      <p className="hotelPrice">
        From <span className="priceSpan">${hotel.acf.price}</span> per night
      </p>
    </div>
  );
}
