import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { convertToBase64 } from "../utils/helper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { updateUserApi } from "../utils/apiFunctions";
import { toast } from "react-toastify";
import { InputAdornment, OutlinedInput } from "@mui/material";

export default function Settings() {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || {}
  );
  const [inputs, setInputs] = useState({
    username: userData?.data?.username,
    photo: userData?.data?.photo,
    password: "",
    newPassword: "",
  });
  const [myAvatar, setAvatar] = useState();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handSubmit = async (e) => {
    e.preventDefault();
    const { username, password, photo, newPassword } = inputs;

    const obj = {};

    if (username) obj.username = username;

    if (password) obj.password = password;

    if (photo) obj.photo = photo;

    if (newPassword) obj.newPassword = newPassword;

    const upd = await updateUserApi("me", obj);

    if (upd?.token) {
      localStorage.setItem("token", upd.token);
      localStorage.setItem("userInfo", JSON.stringify(upd));
    }

    if (upd?.message) {
      toast.success(upd.message);
    }
    if (upd?.error) {
      toast.error(upd.error);
    }
  };

  const handleImageInput = async (e) => {
    const imgFile = e.target.files[0];
    const imgUrl = await convertToBase64(imgFile);
    setAvatar(imgUrl);
  };

  return (
    <div className="w-full h-screen bg-[#333] flex items-center justify-center">
      <form onSubmit={handSubmit} className="max-w-[375px] flex flex-col items-center gap-5 bg-white p-5 rounded-xl">
        <label htmlFor="photo">
          <Avatar sx={{ width: 150, height: 150 }} src={myAvatar || inputs.photo || ""} />

          <input type="file" accept=".png, .jpg, .jpeg, .gif" id="photo" className="hidden absolute top-0 left-0" onChange={handleImageInput}/>
        </label>

        <label htmlFor="username" className="w-full flex flex-col">
          <span>Username</span>
          <TextField type="text" id="username" defaultValue={inputs.username} onChange={(e) => setInputs({...inputs, username: e.target.value})} />
        </label>

        <label htmlFor="password" className="w-full flex flex-col">
          <span>Password</span>
          <OutlinedInput
            id="outlined-adornment-weight password"
            type={showPassword ? "text" : "password"}
            className="w-full"
            required
            onChange={(e) => setInputs({...inputs, password: e.target.value})}
            endAdornment={
              <InputAdornment
                onClick={handleClickShowPassword}
                className="cursor-pointer"
                position="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </InputAdornment>
            }
            aria-describedby="outlined-weight-helper-text"
          />
        </label>

        <label htmlFor="newPassword" className="w-full flex flex-col">
          <span>New Password</span>
          <OutlinedInput
            id="outlined-adornment-weight newPassword"
            type={showPassword ? "text" : "password"}
            className="w-full"
            onChange={(e) => setInputs({ ...inputs, newPassword: e.target.value})}
            endAdornment={
              <InputAdornment
                onClick={handleClickShowPassword}
                className="cursor-pointer"
                position="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </InputAdornment>
            }
            aria-describedby="outlined-weight-helper-text"
          />
        </label>

        <Button type="submit" variant="contained">Editing</Button>
      </form>
    </div>
  );
}
