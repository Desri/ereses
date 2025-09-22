"use client";
import { api, BASE_URL } from "@/constants";
import Cookies from "js-cookie";
const token = Cookies.get("accessToken");

export const getNotifikasi = async (status: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${api.notifikasi.list}/${status}`, {
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

export const getNotifikasiNotRead = async (status: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${api.notifikasi.list}/${status}`, {
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

export const getAllNotifikasi = async () => {
  try {
    const response = await fetch(`${BASE_URL}/${api.notifikasi.list}`, {
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
