import React, { createContext, useEffect, useReducer } from "react";
import { getUserApi } from "../utils/apiFunctions";

const UserInfo = createContext();

export default function UserContext({ children }) {
  const [user, dispatch] = useReducer(async (state, action) => {
    switch (action.type) {
      case "getUser":
        const data = await getUserApi();
        localStorage.setItem("userInfo", JSON.stringify(data));
        return data;
      default:
        return state;
    }
  });

  useEffect(() => {
    dispatch({ type: "getUser" });
    
  }, []);

  return <UserInfo.Provider value={{ user, dispatch }}>{children}</UserInfo.Provider>;
}

export { UserInfo };
