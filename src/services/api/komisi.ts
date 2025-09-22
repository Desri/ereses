"use client";
import { api, BASE_URL } from "@/constants";
import Cookies from "js-cookie";
const token = Cookies.get("accessToken");

export const postKomisi = async ({ payload }: { payload: any }) => {
  try {
    const response = await fetch(`${BASE_URL}/${api.komisi.url}`, {
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

export const getKomisi = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/${api.komisi.url}/?page=1&limit=10&search=`,
      {
        headers: {
          method: "GET",
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

export const deleteKomisi = async ({ id }: { id: number }) => {
  try {
    const response = await fetch(`${BASE_URL}/${api.komisi.url}/${id}`, {
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

export const updateKomisi = async (payload: any) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${api.komisi.url}/${payload.payload.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload.payload.name),
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
