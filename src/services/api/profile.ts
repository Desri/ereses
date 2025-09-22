"use client";
import { api, BASE_URL } from "@/constants";
import Cookies from "js-cookie";
const token = Cookies.get("accessToken");
const userId = Cookies.get("userId");

export const getProfile = async () => {
  try {
    const response = await fetch(`${BASE_URL}/${api.auth.profile}`, {
      headers: {
        method: "GET",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const putProfile = async (payload: any) => {
  try {
    const response = await fetch(`${BASE_URL}/${api.auth.profile}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload.data)
    });
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const changePassword = async (payload: { oldPassword: string; password: string; confirmPassword: string }) => {
  try {
    const response = await fetch(`https://backend-ereses.newus.id/api/auth/change-password`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to change password");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};
