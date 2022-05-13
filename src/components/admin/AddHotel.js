import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../forms/FormError";
import useAxios from "../../hooks/useAxios";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
  //price: yup.string().required("Add price"),
});

export default function AddHotel() {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const http = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    data.status = "publish";

    console.log(data);

    try {
      const response = await http.post("wp/v2/hotels", data);
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
      {serverError && <FormError>{serverError}</FormError>}
      <fieldset disabled={submitting}>
        <div>
          <label className="formLabel">Title</label>
          <input name="title2" {...register("title")} className="formInput" />
          {errors.title && <FormError>{errors.title.message}</FormError>}
        </div>

        <div>
          <label className="formLabel">Content</label>
          <input
            name="content"
            {...register("content")}
            type="textarea"
            className="formInput"
          />
          {errors.content && <FormError>{errors.content.message}</FormError>}
        </div>
        <div>
          <label className="formLabel">Price</label>

          <input
            name="price"
            {...register("fields.price")}
            className="formInput"
            type="number"
          />
          {errors.price && <FormError>{errors.price.message}</FormError>}
        </div>
        <button className="formBtn">Add Hotel</button>
      </fieldset>
    </form>
  );
}
