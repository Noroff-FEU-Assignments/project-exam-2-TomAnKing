import axios from "axios";
import { useEffect, useState } from "react";

export default function FetchHotels() {
  const [hotel, setHotel] = useState([]);

  useEffect(function () {
    getHotels();

    async function getHotels() {
      try {
        const response = await axios.get(
          "https://holidaze.tomanking.one/wp-json/wp/v2/hotels?per_page=100"
        );
        setHotel(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return hotel;
}
