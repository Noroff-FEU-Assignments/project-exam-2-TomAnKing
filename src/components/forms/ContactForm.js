import { useForm } from "react-hook-form";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "./FormError";
import Head from "../layout/Head";

const schema = yup.object().shape({
  fields: yup.object().shape({
    first_name: yup.string().required("Please enter your first name"),
    last_name: yup.string().required("Please enter your last name"),
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    message: yup
      .string()
      .max(300, "Message must be under 300 characters")
      .required("Please enter your message"),
  }),
});

export default function ContactForm() {
  const [, setSubmitting] = useState(false);
  const [, setServerError] = useState(null);
  const [token, setToken] = useState(null);
  const [thanks, showThanks] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
      await http.post("wp/v2/messages", data);
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
      showThanks(true);
    }
  }

  return (
    <>
      <Head title={"Contact Us"} />
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h1>Contact</h1>
          <h2
            className="formMessage"
            style={{ display: thanks ? "block" : "none" }}
          >
            Thanks for contacting us
          </h2>

          <div>
            <label className="formLabel">First Name</label>
            <input
              name="ddd"
              {...register("fields.first_name")}
              className="formInput"
            />
            {errors.fields?.first_name?.message && (
              <FormError>{errors.fields?.first_name.message}</FormError>
            )}
          </div>
          <div>
            <label className="formLabel">Last Name</label>
            <input
              name="ddd"
              {...register("fields.last_name")}
              className="formInput"
            />
            {errors.fields?.last_name?.message && (
              <FormError>{errors.fields?.last_name.message}</FormError>
            )}
          </div>
          <div>
            <label className="formLabel">Email</label>
            <input
              name="ddd"
              {...register("fields.email")}
              className="formInput"
            />
            {errors.fields?.email?.message && (
              <FormError>{errors.fields?.email.message}</FormError>
            )}
          </div>
          <div>
            <label className="formLabel">Message</label>
            <textarea
              rows={10}
              {...register("fields.message")}
              className="formInput"
            />
            {errors.fields?.message?.message && (
              <FormError>{errors.fields?.message.message}</FormError>
            )}
          </div>
          <button className="formBtn">Contact</button>
        </form>
      </div>
    </>
  );
}
