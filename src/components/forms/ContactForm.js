import { useForm } from "react-hook-form";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvaG9saWRhemUudG9tYW5raW5nLm9uZSIsImlhdCI6MTY1Mjg5MzAzNywibmJmIjoxNjUyODkzMDM3LCJleHAiOjE2NTM0OTc4MzcsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.kdIl-g2zoSvSZpA41z7gH0aKRCXSfzoehQx-Tr-zc28";
  const http = useAxios(token);

  const { register, handleSubmit } = useForm({});

  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    data.status = "publish";

    console.log(data);

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
