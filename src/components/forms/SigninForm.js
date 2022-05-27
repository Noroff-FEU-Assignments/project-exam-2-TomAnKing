import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import FormError from "./FormError";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { BASE_URL, TOKEN_PATH } from "../../constants/api";
import Head from "../layout/Head";

const url = BASE_URL + TOKEN_PATH;

const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

export default function LoginForm({ signIn }) {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    try {
      const response = await axios.post(url, data);

      setAuth(response.data);

      localStorage.setItem("auth", response.data.token);
      navigate("/admin");
    } catch (error) {
      console.log("error", error);
      setLoginError("Wrong username or password");
    } finally {
      setSubmitting(false);
      signIn();
    }
  }
  return (
    <>
      <Head title={"Sign In"} />
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h1>Sign In</h1>
          {loginError && <FormError>{loginError}</FormError>}
          <fieldset disabled={submitting}>
            <div>
              <label className="formLabel">Username</label>
              <input
                name="username"
                {...register("username")}
                className="formInput"
              />
              {errors.username && (
                <FormError>{errors.username.message}</FormError>
              )}
            </div>
            <div>
              <label className="formLabel">Password</label>
              <input
                name="password"
                {...register("password")}
                type="password"
                className="formInput"
              />
              {errors.password && (
                <FormError>{errors.password.message}</FormError>
              )}
            </div>
            <button className="formBtn">Log In</button>
          </fieldset>
        </form>
      </div>
    </>
  );
}
