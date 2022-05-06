import axios from "axios";
import { useEffect, useState } from "react";

export default function FetchHotels() {
  const [hotel, setHotel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      } finally {
        setLoading(false);
      }
    }
  }, []);

  return hotel;
}
