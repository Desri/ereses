"use client";
import { api, BASE_URL } from "@/constants";
import Cookies from "js-cookie";
const token = Cookies.get("accessToken");
import { getAuthHeaders } from "@/lib/auth/getAuthHeaders";
import { useAuthStore } from "@/store/profileStore";

const setUser = useAuthStore.getState().setUser;
const setIsLogin = useAuthStore.getState().setIsLogin;

export const postRegister = async ({ payload }: { payload: any }) => {
  try {
    const response = await fetch(`${BASE_URL}/${api.auth.register}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
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

export const postLogin = async ({ payload }: { payload: any }) => {
  try {
    const response = await fetch(`${BASE_URL}/${api.auth.login}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    if (!response.ok) {
      const message = data?.message;
      throw new Error(message);
    } else {
      Cookies.set('accessToken', data.data.token, {
        expires: 3,
        secure: true,
        sameSite: 'Strict',
      });
      Cookies.set('userId', data.data.id, {
        expires: 3,
        secure: true,
        sameSite: 'Strict',
      });
      await getProfile()
    }
    return data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const getProfile = async () => {
  try {

    const response = await fetch(
      `${BASE_URL}/${api.auth.profile}`,
      {
        method: "GET",
        headers: getAuthHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    setUser(data.data);
    setIsLogin(true);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const postPassword = async ({ payload }: { payload: string }) => {
  try {
    const response = await fetch(`${BASE_URL}/${api.auth.forgotPassword}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
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

export const postResetPassword = async ({ payload }: { payload: any }) => {
  try {
    const response = await fetch(`${BASE_URL}/${api.auth.resetPassword}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
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

export const postRegisterMasyarakat = async ({ formData }: { formData: any }) => {
  try {
    const response = await fetch(`${BASE_URL}/${api.createUser.url}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
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
