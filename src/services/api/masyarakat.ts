"use client";
import { api, BASE_URL } from "@/constants";
import Cookies from "js-cookie";
const token = Cookies.get("accessToken");

export const getMasyarakat = async ({ isActive = '' }: { isActive?: string } = {}) => {
  try {
    const response = await fetch(`${BASE_URL}/${api.user.list}?page=1&limit=10&role=user`, {
      method: "GET",
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

export const deleteUser = async ({ id }: { id: number }) => {
  try {
    const response = await fetch(`${BASE_URL}/${api.user.delete}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
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

export const detailUser = async ({ id }: { id: number }) => {
  try {
    const response = await fetch(`${BASE_URL}/${api.user.list}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
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
