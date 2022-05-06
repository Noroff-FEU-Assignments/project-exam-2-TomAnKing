import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Accommodation() {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let navigate = useNavigate();

  const { id } = useParams();

  if (!id) {
    navigate.push("/");
  }

  const url = "https://holidaze.tomanking.one/wp-json/wp/v2/hotels" + "/" + id;

  useEffect(
    function () {
      async function getHotel() {
        try {
          const response = await axios.get(url);
          setHotel(response.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
      getHotel();
    },
    [url]
  );

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">An error occured: {error}</div>;
  }

  function createMarkup() {
    return { __html: hotel.content.rendered };
  }

  return (
    <div className="container">
      <div className="hotel-detail">
        <h1>{hotel.title.rendered}</h1>
        <img className="hotelImg" src={hotel.acf.image} />
        <img className="hotelImg" src={hotel.acf.modal_image_1} />
        <img className="hotelImg" src={hotel.acf.modal_image_2} />

        <div dangerouslySetInnerHTML={createMarkup()} />
      </div>
    </div>
  );
}

export default Accommodation;
