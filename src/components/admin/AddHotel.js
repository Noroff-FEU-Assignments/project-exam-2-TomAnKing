import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../forms/FormError";
import useAxios from "../../hooks/useAxios";
import axios from "axios";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
  /*   price: yup.number().required("Add price"),
  stars: yup.number().required("Add stars"), */
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

    var formData = new FormData();
    var formData2 = new FormData();
    var formData3 = new FormData();

    var inputs = document.querySelectorAll("input[type=file]");

    formData.append("file", inputs[0].files[0]);
    formData2.append("file", inputs[1].files[0]);
    formData3.append("file", inputs[2].files[0]);

    data.status = "publish";

    try {
      await http.post("/wp/v2/media", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await http.post("/wp/v2/media", formData2, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await http.post("/wp/v2/media", formData3, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const images = await axios.get(
        "https://holidaze.tomanking.one/wp-json/wp/v2/media"
      );

      data.fields.modal_image_2 = images.data[0].id;
      data.fields.modal_image_1 = images.data[1].id;
      data.fields.image = images.data[2].id;

      await http.post("wp/v2/hotels", data);
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
      window.location.reload(false);
    }
  }

  return (
    <div className="container">
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
          <div>
            <label className="formLabel">Stars</label>

            <input
              name="stars"
              {...register("fields.stars")}
              className="formInput"
              type="number"
            />
            {errors.stars && <FormError>{errors.stars.message}</FormError>}
          </div>
          <div>
            <label className="formLabel">Image</label>

            <input
              name="stars"
              className="formInput"
              type="file"
              accept="image/*"
              id="file0"
            />
            {errors.stars && <FormError>{errors.stars.message}</FormError>}
          </div>
          <div>
            <label className="formLabel">Image</label>

            <input
              name="stars"
              className="formInput"
              type="file"
              accept="image/*"
              id="file1"
            />
            {errors.stars && <FormError>{errors.stars.message}</FormError>}
          </div>
          <div>
            <label className="formLabel">Image</label>

            <input
              name="stars"
              className="formInput"
              type="file"
              accept="image/*"
              id="file2"
            />
            {errors.stars && <FormError>{errors.stars.message}</FormError>}
          </div>
          <button className="formBtn">Add Hotel</button>
        </fieldset>
      </form>
    </div>
  );
}
