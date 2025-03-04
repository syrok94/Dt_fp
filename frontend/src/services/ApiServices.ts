import { User } from "../interfaces/ContextInterface";
import {baseURL} from  "../config/Config.json";

let token: string;
let user : User;

export const doSignIn = async (payload: any) => {
  try {
    const res = await fetch(`${baseURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Sign-in failed with status ${res.status}`);
    }

    const resData = await res.json();
    const accessToken = resData["accessToken"];
    
    console.log("Access Token:", accessToken);

    const userInfoResponse = await fetch(`${baseURL}/auth/getUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userInfoResponse.ok) {
      throw new Error(`Failed to fetch user info: ${userInfoResponse.status}`);
    }

    const userInfo = await userInfoResponse.json();

    console.log("user info:" , userInfo);

    token = accessToken;
    user = userInfo;

    return {accessToken , userInfo};

  } catch (error) {
    console.error("Error during sign-in:", error);
    throw error;
  }
};

export const doSignUp = async (payload: any) => {
  try {

    const res = await fetch(`${baseURL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Sign-up failed with status ${res.status}`);
    }

    return  res;
  } catch (error) {
    console.error("Error during sign-up:", error);
    throw error;
  }
};


export const fetchAllBoards = async () => {

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) {
    console.error("Token is missing. User is not authenticated.");
    return null;
  }

  if (!user.id) {
    console.error("User ID is missing in localStorage.");
    return null;
  }

  try {
    const res = await fetch(`${baseURL}/board/getAllBoard/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      console.warn(`Failed to fetch boards. Status: ${res.status}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching boards:", error);
    return null;
  }
};