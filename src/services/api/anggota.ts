"use client";
import { api, BASE_URL } from "@/constants";
import { getAuthHeaders } from "@/lib/auth/getAuthHeaders";

export const getlistAnggota = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/${api.anggota.list}/?page=1&limit=51&search=`,
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

export const getlistAkunAnggota = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/${api.anggota.list}/?page=1&limit=51&role=anggota`,
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

export const getDetailAnggota = async (slug1: string, slug2: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${api.anggota.list}/${slug1}/${slug2}`,
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

export const getDetailAnggotaDiscuss = async (slug: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${api.anggota.list}/${slug}`,
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