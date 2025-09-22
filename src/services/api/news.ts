"use client";
import { api, BASE_URL } from "@/constants";
import { getAuthHeaders } from "@/lib/auth/getAuthHeaders";

export const getNews = async (limit: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${api.news.list}/?page=1&limit=${limit}&search=`,
      {
        method: "GET",
        headers: getAuthHeaders(),
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

export const getDetailNews = async (url: any) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${api.news.detail}/${url}`,
      {
        method: "GET",
        headers: getAuthHeaders(),
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

export const deleteNews = async ({ id }: { id: number }) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${api.news.list}/${id}`,
      {
        method: "DELETE",
        headers: getAuthHeaders(),
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
