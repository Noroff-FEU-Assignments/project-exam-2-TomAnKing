import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../forms/FormError";

const schema = yup.object().shape({
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
});

export default function BookingModal(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
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
          <input {...register("name")} className="formInput" />
          {errors.name && <FormError>{errors.name.message}</FormError>}
          <label className="formLabel">Card number</label>
          <input {...register("cardnumber")} className="formInput" />
          {errors.cardnumber && (
            <FormError>{errors.cardnumber.message}</FormError>
          )}
          <label className="formLabel">Expiry date</label>

          <select name="expireMM" id="expireMM">
            <option value="">Month</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <select name="expireYY" id="expireYY">
            <option value="">Year</option>
            <option value="20">2022</option>
            <option value="21">2023</option>
            <option value="22">2024</option>
            <option value="23">2025</option>
            <option value="24">2026</option>
          </select>
          {errors.expirydate && (
            <FormError>{errors.expirydate.message}</FormError>
          )}
          <label className="formLabel">Security Code</label>
          <input {...register("securitycode")} className="formInput" />
          {errors.securitycode && (
            <FormError>{errors.securitycode.message}</FormError>
          )}
          <button className="formBtn">Complete Booking</button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
