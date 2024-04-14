import React, { createContext, useEffect, useReducer, useState } from "react";
import { addMsgApi, getMsgApi } from "../utils/apiFunctions";

const ChatData = createContext();

export default function ChatContext({ children }) {
  const [isLoad, setLoad] = useState(false);

  const [chats, dispatch] = useReducer(async (state, action) => {
    let data = null;
    switch (action.type) {
      case "getMSG":
        data = await getMsgApi();
        return data;
      case "add":
        await addMsgApi(action.payload);
        data = await getMsgApi();
        return data;
      case "delete":
        return state
      case "update":
        return state;
      default:
        return state;
    }
  });

  return <ChatData.Provider value={{chats, dispatch}}>{children}</ChatData.Provider>;
}

export { ChatData };
