"use client";
import { api, BASE_URL } from "@/constants";
import Cookies from "js-cookie";
const token = Cookies.get("accessToken");

export const getDapil = async () => {
  try {
    const response = await fetch(`${BASE_URL}/${api.dapil.url}/?page=1&limit=10&search=`, {
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

export const getDapilTotal = async () => {
  try {
    const response = await fetch(`${BASE_URL}/${api.dapil.total}`, {
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

export const getDapilBagan = async ({ id }: { id: any }) => {
  try {
    const response = await fetch(`${BASE_URL}/${api.dapil.bagan}?limit=1000&kecamatan=${id}`, {
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

export const postDapil = async ({ payload }: { payload: any }) => {
  try {
    const response = await fetch(`${BASE_URL}/${api.dapil.url}`, {
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

export const deleteDapil = async ({ id }: { id: number }) => {
  try {
    const response = await fetch(`${BASE_URL}/${api.dapil.url}/${id}`, {
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
