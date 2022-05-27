import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/api";

export default function FetchHotels() {
  const [hotel, setHotel] = useState([]);
  const [error, setError] = useState(null);
  useEffect(function () {
    getHotels();

    async function getHotels() {
      try {
        const response = await axios.get(
          BASE_URL + "wp/v2/hotels?per_page=100"
        );
        setHotel(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
      }
    }
  }, []);

  return {
    hotel: hotel,
    error: error,
  };
}
