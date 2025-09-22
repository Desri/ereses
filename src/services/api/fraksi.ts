"use client";
import { api, BASE_URL } from "@/constants";
import Cookies from "js-cookie";
const token = Cookies.get("accessToken");

export const postFraksi = async ({ payload }: { payload: any }) => {
  try {
    const response = await fetch(`${BASE_URL}/${api.fraksi.url}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
      const message = data?.message;
      throw new Error(message);
    }
    return data;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const getFraksi = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/${api.fraksi.url}?page=1&limit=10&search=`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const putFraksi = async ({ payload }: { payload: any }) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${api.fraksi.url}/${payload.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: payload.name,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const deleteFraksi = async ({ id }: { id: number }) => {
  try {
    const response = await fetch(`${BASE_URL}/${api.fraksi.url}/${id}`, {
      method: "DELETE",
      headers: {
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
