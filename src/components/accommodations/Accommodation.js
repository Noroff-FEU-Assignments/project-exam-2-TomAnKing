import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ModalGalery from "./ModalGalery";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import BookingModal from "./BookingModal";

function Accommodation() {
  const [isActive, setIsActive] = useState(false);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const [modalShow, setModalShow] = useState(false);

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
          setError(error);
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

  const buttons = document.querySelectorAll("[data-carousel-button]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const offset = button.dataset.carouselButton === "next" ? -1 : 1;
      const slides = button
        .closest("[data-carousel]")
        .querySelector("[data-slides]");

      const activeSlide = slides.querySelector("[data-active]");
      let newIndex = [...slides.children].indexOf(activeSlide) + offset;
      if (newIndex < 0) newIndex = slides.children.length - 1;
      if (newIndex >= slides.children.length) newIndex = 0;

      slides.children[newIndex].dataset.active = true;
      delete activeSlide.dataset.active;
    });
  });

  const handleClick = () => {
    setIsActive((current) => !current);
  };

  return (
    <>
      <div
        className="carousel"
        data-carousel
        style={{
          display: isActive ? "block" : "none",
        }}
      >
        <button onClick={handleClick} className="close">
          &times;
        </button>
        <button className="carousel-button prev" data-carousel-button="prev">
          &#8249;
        </button>
        <button className="carousel-button next" data-carousel-button="next">
          &#8250;
        </button>
        <ul data-slides>
          <li className="slide" data-active>
            <img src={hotel.acf.image} />
          </li>
          <li className="slide">
            <img src={hotel.acf.modal_image_1} />
          </li>
          <li className="slide">
            <img src={hotel.acf.modal_image_2} />
          </li>
        </ul>
      </div>
      <div className="container">
        <div className="hotel-detail">
          <h1>{hotel.title.rendered}</h1>
          <div className="hotelDetailImages">
            <img
              onClick={handleClick}
              className="hotelDetailImg"
              id="test"
              src={hotel.acf.image}
            />
            <img
              onClick={handleClick}
              className="testImg"
              src={hotel.acf.modal_image_1}
            />
            <img
              onClick={handleClick}
              className="testImg2"
              src={hotel.acf.modal_image_2}
            />
          </div>
          <p>${hotel.acf.price}</p>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
          />
          <div dangerouslySetInnerHTML={createMarkup()} />
        </div>
        <button variant="primary" onClick={() => setModalShow(true)}>
          Book
        </button>

        <BookingModal show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </>
  );
}

export default Accommodation;
