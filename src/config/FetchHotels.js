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

export function FetchMessages() {
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(function () {
    getMessages();

    async function getMessages() {
      try {
        const response = await axios.get(
          "https://holidaze.tomanking.one/wp-json/wp/v2/messages"
        );
        setMessage(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  return message;
}

export function FetchEnquiries() {
  const [enquiry, setEnquiry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(function () {
    getEnquiries();

    async function getEnquiries() {
      try {
        const response = await axios.get(
          "https://holidaze.tomanking.one/wp-json/wp/v2/enquiries"
        );
        setEnquiry(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  return enquiry;
}
