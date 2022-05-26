import { useForm } from "react-hook-form";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "axios";

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [token, setToken] = useState(null);

  const { register, handleSubmit } = useForm({});

  getToken();

  async function getToken() {
    const loginInfo = {
      username: "admin",
      password: "password123",
    };
    const response = await axios.post(
      "https://holidaze.tomanking.one/wp-json/jwt-auth/v1/token",
      loginInfo
    );

    setToken(response.data.token);
  }

  const http = useAxios(token);

  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    data.status = "publish";

    try {
      const response = await http.post("wp/v2/messages", data);

      // console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <h1>Contact</h1>
      <label className="formLabel">First Name</label>
      <input {...register("fields.first_name")} className="formInput" />

      <label className="formLabel">Last Name</label>
      <input {...register("fields.last_name")} className="formInput" />

      <label className="formLabel">Email</label>
      <input {...register("fields.email")} className="formInput" />

      <label className="formLabel">Message</label>
      <textarea
        rows={10}
        {...register("fields.message")}
        className="formInput"
      />

      <button className="formBtn">Contact</button>
    </form>
  );
}
