import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../forms/FormError";
import useAxios from "../../hooks/useAxios";
import axios from "axios";
import Head from "../layout/Head";
import { BASE_URL } from "../../constants/api";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
  fields: yup.object().shape({
    price: yup.string().required("Please enter cardholders name"),
    stars: yup
      .number("Stars")
      .typeError("Please enter stars")
      .min(1, "Minimum 1 star")
      .max(5, "Maximum 5 stars")
      .required("Please enter stars"),

    address: yup.string().required("Please enter address"),
  }),
});

export default function AddHotel() {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [loader, setLoader] = useState(false);

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
      setLoader(true);
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

      const images = await axios.get(BASE_URL + "wp/v2/media");

      data.fields.modal_image_2 = images.data[0].id;
      data.fields.modal_image_1 = images.data[1].id;
      data.fields.image = images.data[2].id;

      await http.post("wp/v2/hotels", data);
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString(""));
    } finally {
      setSubmitting(false);
      window.location.reload(false);
      setLoader(false);
    }
  }

  function DisplayContent() {
    if (loader) {
      return <div className="loader"></div>;
    }

    return (
      <>
        <h1 className="adminContentTitle">Add Hotel</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="form addHotelForm">
          {serverError && <FormError>{serverError}</FormError>}
          <fieldset disabled={submitting}>
            <div>
              <label className="formLabel">Title</label>
              <input
                name="title2"
                {...register("title")}
                className="formInput"
              />
              {errors.title && <FormError>{errors.title.message}</FormError>}
            </div>
            <div>
              <label className="formLabel">Content</label>
              <textarea
                rows={10}
                {...register("content")}
                className="formInput"
              />
              {errors.content && (
                <FormError>{errors.content.message}</FormError>
              )}
            </div>
            <div>
              <label className="formLabel">Price</label>
              <input
                name="price"
                {...register("fields.price")}
                className="formInput"
                type="number"
              />
              {errors.fields?.price && (
                <FormError>{errors.fields?.price?.message}</FormError>
              )}
            </div>
            <div>
              <label className="formLabel">Stars</label>
              <input
                name="stars"
                {...register("fields.stars")}
                className="formInput"
                type="number"
              />
              {errors.fields?.stars && (
                <FormError>{errors.fields?.stars?.message}</FormError>
              )}
            </div>
            <div>
              <label className="formLabel">Address</label>
              <input
                name="title2"
                {...register("fields.address")}
                className="formInput"
              />
              {errors.fields?.address && (
                <FormError>{errors.fields?.address?.message}</FormError>
              )}
            </div>
            <div>
              <label className="formLabel">Main Image</label>
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
              <label className="formLabel">Gallery Image 1</label>
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
              <label className="formLabel">Gallery Image 2</label>
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
      </>
    );
  }

  return (
    <>
      <Head title={"Admin - Add Hotel"} />
      <div className="container">
        <DisplayContent />
      </div>
    </>
  );
}
