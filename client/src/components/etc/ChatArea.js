import React, { useContext, useEffect, useState } from "react";
import { ChatData } from "../../context/ChatContext";
import { UserInfo } from "../../context/UserContext";
import Loading from "../Loading/Loading";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function ChatArea() {
  const [isLoad, setLoad] = useState(false);
  const { chats, dispatch } = useContext(ChatData);
  const { user } = useContext(UserInfo);
  const [loading, setLoading] = useState(false);
  const [chatData, setChatData] = useState();
  const [userData, setUserData] = useState();
  const [show, setShow] = useState(false);
  const [points, setPoints] = useState();

  async function syncUser() {
    const chatData = await chats;
    const userData = await user;
    setUserData(userData);
    setChatData(chatData);
  }

  // Get Message per 500 ms timeout
  const infoLoaded = () => {
    setLoad(!isLoad);
  }

  setTimeout(() => {
    infoLoaded();
  }, 500);

  useEffect(() => {
    dispatch({ type: "getMSG" });
  }, [isLoad])

  // ----------------------------------

  useEffect(() => {
    syncUser();
  }, [chats || user]);

  useEffect(() => {
    setLoading(true);
    if (chatData) {
      setLoading(false);
    }
  }, [chatData]);

  useEffect(() => {
    const handleClick = () => setShow(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      {!loading && (
        <div className=" w-full h-[calc(100vh_-_120px)] overflow-y-scroll">
          {chatData?.messages ? (
            <div className="w-full min-h-[calc(100vh_-_120px] p-5 flex flex-col items-start gap-3">
              {chatData.messages.map((chat) => {
                const { text } = chat;
                const { _id, photo, username } = chat.user;
                const isMsg = userData.data._id === _id;
                return (
                  <div
                    onContextMenu={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShow(true);
                      setPoints({ x: e.pageX, y: e.pageY });
                    }}
                    key={chat._id}
                    className={`flex gap-2 items-end ${
                      isMsg ? "self-end flex-row-reverse" : "self-start"
                    } `}
                  >
                    <Avatar src={photo} title={username} />
                    <div
                      className={`px-4 py-2 inline-block ${
                        isMsg
                          ? "bg-[#3a3ae0] rounded-[15px_5px_5px_5px]"
                          : "bg-[#1b1b1b] rounded-[15px_5px_15px_5px]"
                      }`}
                    >
                      <p className="inline-block text-white whitespace-normal">
                        {text}
                      </p>
                    </div>
                  </div>
                );
              })}

              {show && (
                <div
                  className={`absolute top-[${points.y}px] left-[${
                    points.x
                  }px] w-[100px] border-2 border-[#666] rounded-md`}
                >
                  <button className="w-full flex items-center gap-1 p-3 hover:bg-[#1f1e1e]">
                    <span>Delete</span>
                    <DeleteIcon />
                  </button>
                  <button className="w-full flex items-center p-3 gap-1 hover:bg-[#1f1e1e]">
                    <span>Edit</span>
                    <EditIcon />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
              <h1 className="text-2xl">{chatData?.message}</h1>
            </div>
          )}
        </div>
      )}
      <Loading loading={loading} />
    </>
  );
}
