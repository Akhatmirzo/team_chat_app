import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerApi, loginApi } from "../utils/apiFunctions";
import { toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import { convertToBase64 } from "../utils/helper";

export default function Auth() {
  const [toggle, setToogle] = useState(false);
  const { register, handleSubmit } = useForm();
  const [myAvatar, setAvatar] = useState();

  const handleImageInput = async (e) => {
    const imgFile = e.target.files[0];
    const imgUrl = await convertToBase64(imgFile);
    setAvatar(imgUrl);
  };

  const formHandlerSubmit = async (data, type) => {
    switch (type) {
      case "signin":
        const rest = await loginApi(data);
        if (rest?.error) {
          toast.error(rest.error);
        }

        if (rest?.token) {
          toast.success(rest.message);
          localStorage.setItem("token", rest.token);
          window.location.reload();
        }
        break;
      case "signup":
        const res = await registerApi({ ...data, photo: myAvatar });
        if (res?.error) {
          toast.error(res.error);
        }

        if (res?.token) {
          toast.success(res.message);
          localStorage.setItem("token", res.token);
          window.location.reload();
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <section>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        <span></span> <span></span> <span></span> <span></span> <span></span>
        {toggle ? (
          <form
            className="signin"
            onSubmit={handleSubmit((data) => formHandlerSubmit(data, "signin"))}
          >
            <div className="content">
              <h2>Sign In</h2>

              <div className="form">
                <div className="inputBox">
                  <label htmlFor="username">Username</label>
                  <input
                    {...register("username")}
                    type="text"
                    required
                    id="username"
                  />
                </div>

                <div className="inputBox">
                  <label htmlFor="password">Password</label>
                  <input
                    {...register("password")}
                    type="password"
                    required
                    id="password"
                  />
                </div>

                <div className="links">
                  <Link className="links_el">Forgot Password</Link>
                  <div className="links_el" onClick={() => setToogle(!toggle)}>
                    Signup
                  </div>
                </div>

                <div className="inputBox">
                  <button type="submit">Login</button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          //! Sign Up
          <form
            className="signin"
            onSubmit={handleSubmit((data) => formHandlerSubmit(data, "signup"))}
          >
            <div className="content">
              <h2>Sign Up</h2>

              <div className="form">
                <div>
                  <label
                    htmlFor="photos"
                    className="cursor-pointer w-full h-auto flex items-center justify-center"
                  >
                    <Avatar
                      alt="Avatar"
                      src={myAvatar || ""}
                      sx={{ width: 120, height: 120 }}
                    />
                  </label>
                  <input
                    onChange={handleImageInput}
                    type="file"
                    required
                    accept=".png, .jpg, .jpeg, .gif"
                    id="photos"
                    className="hidden"
                  />
                </div>

                <div className="inputBox">
                  <label htmlFor="username">Username</label>
                  <input
                    {...register("username")}
                    type="text"
                    required
                    id="username"
                  />
                </div>

                <div className="inputBox">
                  <label htmlFor="password">Password</label>
                  <input
                    {...register("password")}
                    type="password"
                    required
                    id="password"
                  />
                </div>

                <div className="links">
                  <Link className="links_el"></Link>
                  <div className="links_el" onClick={() => setToogle(!toggle)}>
                    SignIn
                  </div>
                </div>

                <div className="inputBox">
                  <button type="submit">Signup</button>
                </div>
              </div>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
