import { toast } from "react-toastify";
const urlApi = "http://localhost:8000";
const token = localStorage.getItem("token");

// ! Login And Register
// * Register a user
const registerApi = async (data) => {
  try {
    const response = await fetch(`${urlApi}/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (!response.ok) {
      toast.error(res.error);
      throw new Error(response.statusText);
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};
// * Login a user
const loginApi = async (data) => {
  try {
    const response = await fetch(`${urlApi}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (!response.ok) {
      toast.error(res.error);
      throw new Error(response.statusText);
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

// * Get a user
const getUserApi = async () => {
  try {
    const response = await fetch(`${urlApi}/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const res = await response.json();

    if (!response.ok) {
      toast.error(res.error);
      throw new Error(response.statusText);
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

// * Delete a user

const deleteUserApi = async (id) => {
  try {
    const response = await fetch(`${urlApi}/api/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

// * Update a user

const updateUserApi = async (id, data) => {
  try {
    const response = await fetch(`${urlApi}/api/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Get MSG
const getMsgApi = async () => {
  try {
    const response = await fetch(`${urlApi}/api/message`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};

// Add MSG
const addMsgApi = async (data) => {
  try {
    const response = await fetch(`${urlApi}/api/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (!response.ok) {
      toast.error(res.error);
      throw new Error(response.statusText);
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

export { registerApi, loginApi, getUserApi, deleteUserApi, updateUserApi, getMsgApi, addMsgApi };
