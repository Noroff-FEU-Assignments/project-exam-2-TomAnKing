import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "./FormError";
import { Link } from "react-router-dom";

const url = "https://holidaze.tomanking.one/wp-json/jwt-auth/v1/token";

const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    console.log(data);

    try {
      const response = await axios.post(url, data);
      console.log("response", response.data);
      window.location.href = "/admin";
    } catch (error) {
      console.log("error", error);
      setLoginError("Wrong username or password");
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      {loginError && <FormError>{loginError}</FormError>}
      <fieldset disabled={submitting}>
        <div>
          <label>Username</label>
          <input
            name="username"
            {...register("username")}
            className="formInput"
          />
          {errors.username && <FormError>{errors.username.message}</FormError>}
        </div>

        <div>
          <label>Password</label>
          <input
            name="password"
            {...register("password")}
            type="password"
            className="formInput"
          />
          {errors.password && <FormError>{errors.password.message}</FormError>}
        </div>
        <button className="formBtn">Log In</button>
      </fieldset>
    </form>
  );
}
