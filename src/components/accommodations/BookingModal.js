import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../forms/FormError";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "axios";

const schema = yup.object().shape({
  fields: yup.object().shape({
    card_name: yup.string().required("Please enter cardholders name"),
    card_number: yup
      .string()
      .min(16, "Card number must be 16 digits")
      .max(16, "Card number must be 16 digits")
      .required("Please enter cardholders name"),
    expiration_month: yup
      .string()
      .min(1, "Enter expiration month")
      .max(2, "Invalid month")
      .required("Enter expiration month"),
    expiration_year: yup
      .string()
      .min(2, "Enter expiration year")
      .max(2, "Invalid year")
      .required(""),
    security_code: yup
      .string()
      .min(3, "Security code must be 3 digits")
      .max(3, "Security code must be 3 digits")
      .required("Please enter your security code"),
  }),
});

export default function BookingModal(props) {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [token, setToken] = useState(null);
  const [booked, setBooked] = useState(false);

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

    data.fields.from_date = props.datepicker.startDate;

    data.fields.to_date = props.datepicker.endDate;

    data.title = props.title;

    console.log(data);

    try {
      const response = await http.post("wp/v2/enquiries", data);

      //register("fields.to_date", { value: datepicker.props.ranges[0].endDate });

      // console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
      setBooked(true);
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2 style={{ display: booked ? "block" : "none" }}>
          Thank you for your booking
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <label className="formLabel">Name on card</label>
          <input {...register("fields.card_name")} className="formInput" />
          {errors.fields?.card_name && (
            <FormError>{errors.fields?.card_name?.message}</FormError>
          )}
          <label className="formLabel">Card number</label>
          <input
            {...register("fields.card_number")}
            className="formInput"
            placeholder="0000000000000000"
            maxLength={16}
            type="number"
          />
          {errors.fields?.card_number && (
            <FormError>{errors.fields?.card_number?.message}</FormError>
          )}
          <label className="formLabel">Expiration date</label>
          <input
            {...register("fields.expiration_month")}
            className="formInput expDate"
            placeholder="00"
            maxLength={2}
            type="number"
          />
          /
          <input
            {...register("fields.expiration_year")}
            className="formInput expDate month"
            placeholder="00"
            maxLength={2}
            type="number"
          />
          {errors.fields?.expiration_month && (
            <FormError>{errors.fields?.expiration_month?.message}</FormError>
          )}
          {errors.fields?.expiration_year && (
            <FormError>{errors.fields?.expiration_year?.message}</FormError>
          )}
          <label className="formLabel">Security Code</label>
          <input
            {...register("fields.security_code")}
            className="formInput securityCode"
            placeholder="000"
            maxLength={3}
            type="number"
          />
          {errors.fields?.security_code && (
            <FormError>{errors.fields?.security_code?.message}</FormError>
          )}
          <button className="formBtn">Complete Booking</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
