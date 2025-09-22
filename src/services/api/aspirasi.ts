"use client";
import { api, BASE_URL } from "@/constants";
import Cookies from "js-cookie";
const token = Cookies.get("accessToken");

export const postAspirasi = async ({ payload }: { payload: any }) => {
  try {
    const response = await fetch(`${BASE_URL}/${api.aspirasi.url}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
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

export const getAspirasi = async (params?: {
  page?: number;
  limit?: number;
  category?: string;
  dapilId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}) => {
  try {
    const {
      page = 1,
      limit = 10,
      category = "",
      dapilId = "",
      startDate = "",
      endDate = "",
      search = ""
    } = params || {};

    // Build query string dynamically
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(category && { category }),
      ...(dapilId && { dapilId }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(search && { search })
    });

    const response = await fetch(
      `${BASE_URL}/${api.aspirasi.url}?${queryParams.toString()}`,
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
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getDetailAspirasi = async ({ slug }: { slug: any }) => {
  try {
    const response = await fetch(`${BASE_URL}/${api.aspirasi.url}/${slug}`, {
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

export const postKategoriAspirasi = async ({ payload }: { payload: any }) => {
  try {
    const response = await fetch(`${BASE_URL}/${api.aspirasi.add}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getKategoriAspirasi = async () => {
  try {
    const response = await fetch(`${BASE_URL}/${api.aspirasi.list}`, {
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

export const deleteKategoriAspirasi = async ({ id }: { id: number }) => {
  try {
    const response = await fetch(`${BASE_URL}/${api.aspirasi.delete}/${id}`, {
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

export const getDetailRegion = async ({ id }: { id: any }) => {
  try {
    const response = await fetch(`https://indoregion.newus.id/region/regency/code/${id}`, {
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

export const getDetailDistrict = async ({ id }: { id: any }) => {
  try {
    const response = await fetch(`https://indoregion.newus.id/region/district/code/${id}`, {
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

export const getDetailDistricts = async () => {
  try {
    const response = await fetch(`https://indoregion.newus.id/region/districts/code/1612`, {
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

export const getDetailVillage = async ({ id }: { id: any }) => {
  try {
    const response = await fetch(`https://indoregion.newus.id/region/village/code/${id}`, {
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

export const getDetailVillages = async ({ id }: { id: any }) => {
  try {
    const response = await fetch(`https://indoregion.newus.id/region/villages/code/${id}`, {
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

export const getVerifiedAspirasi = async (params?: {
  page?: number;
  limit?: number;
  category?: string;
  dapilId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}) => {
  try {
    const {
      category = "",
      dapilId = "",
      startDate = "",
      endDate = "",
      search = ""
    } = params || {};

    // Build query string dynamically
    const queryParams = new URLSearchParams({
      status: "VerifiedBySecretariat",
      ...(category && { category }),
      ...(dapilId && { dapilId }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(search && { search })
    });

    const response = await fetch(
      `${BASE_URL}/${api.aspirasi.url}?${queryParams.toString()}`,
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
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

