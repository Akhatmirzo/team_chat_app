import React, { useContext, useEffect, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { UserInfo } from "../../context/UserContext";
import { Link } from "react-router-dom";

export default function ChatNavbar() {
  const { user, dispatch } = useContext(UserInfo);
  const [userData, setUserData] = useState();

  async function syncUser() {
    const userData = await user;
    setUserData(userData);
  }

  useEffect(() => {
    syncUser();
  }, [user]);

  return (
    <div className="w-full h-[70px] p-3 flex items-center justify-between shadow-[white_0px_2px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]">
      <h1 className="text-3xl font-mono">Chat App</h1>

      <div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute top-0 left-0 flex h-3 w-3">
              <span className="animate-ping absolute -top-[2px] -left-[2px] inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="inline-flex absolute top-0 left-0 rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <NotificationsNoneIcon className="cursor-pointer notifAnim" />
          </div>
          <Link to={"/settings"}>
            <SettingsIcon className="cursor-pointer hover:animate-spin" />
          </Link>
          <Avatar
            alt="Avatar"
            src={userData?.data?.photo}
            title={userData?.data?.username}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
