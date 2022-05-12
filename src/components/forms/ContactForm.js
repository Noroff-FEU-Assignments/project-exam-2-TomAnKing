import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "./FormError";

const schema = yup.object().shape({
  firstname: yup
    .string()
    .required("Please enter your first name")
    .min(3, "First name must contain at least 3 characters"),
  lastname: yup
    .string()
    .required("Please enter your last name")
    .min(4, "Last name must contain at least 4 characters"),
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  message: yup
    .string()
    .required("Please enter your message")
    .min(10, "The message must be at least 10 characters"),
});

export default function ContactForm() {
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

  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <label className="formLabel">First Name</label>
      <input {...register("firstname")} className="formInput" />
      {errors.firstname && <FormError>{errors.firstname.message}</FormError>}
      <label className="formLabel">Last Name</label>
      <input {...register("lastname")} className="formInput" />
      {errors.lastname && <FormError>{errors.lastname.message}</FormError>}
      <label className="formLabel">Email</label>
      <input {...register("email")} className="formInput" />
      {errors.email && <FormError>{errors.email.message}</FormError>}
      <label className="formLabel">Message</label>
      <textarea rows={10} {...register("message")} className="formInput" />
      {errors.message && <FormError>{errors.message.message}</FormError>}

      <button className="formBtn">Contact</button>
    </form>
  );
}
