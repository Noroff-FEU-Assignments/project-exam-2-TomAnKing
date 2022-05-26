import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../forms/FormError";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "axios";

/* const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your name")
    .min(3, "Your name must contain at least 3 characters"),
  cardnumber: yup
    .number()
    .required("Please enter your last name")
    .typeError("Card number must be a number"),
  expirydate: yup
    .number()
    .required("Please enter your expiry date")
    .typeError("Expiry date must be a number"),
  securitycode: yup
    .number()
    .required("Please enter your message")
    .min(3, "The security code must be 3 characters")
    .typeError("Security code must be a number"),
}); */

export default function BookingModal(props) {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [token, setToken] = useState(null);

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

  const { register, handleSubmit } = useForm({});

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
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <label className="formLabel">Name on card</label>
          <input {...register("fields.card_name")} className="formInput" />
          {/*  {errors.name && <FormError>{errors.name.message}</FormError>} */}
          <label className="formLabel">Card number</label>
          <input
            {...register("fields.card_number")}
            className="formInput"
            placeholder="0000000000000000"
            maxLength={16}
            type="number"
          />
          {/*  {errors.cardnumber && (
            <FormError>{errors.cardnumber.message}</FormError>
          )} */}
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
          {/*  {errors.expirydate && (
            <FormError>{errors.expirydate.message}</FormError>
          )} */}
          <label className="formLabel">Security Code</label>
          <input
            {...register("fields.security_code")}
            className="formInput securityCode"
            placeholder="000"
            maxLength={3}
            type="number"
          />
          {/* {errors.securitycode && (
            <FormError>{errors.securitycode.message}</FormError>
          )} */}
          <button className="formBtn">Complete Booking</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
