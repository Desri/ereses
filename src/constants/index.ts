export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  auth: {
    login: "api/auth/login",
    register: "api/auth/register",
    profile: "api/user/profile",
    forgotPassword: "api/auth/forgot-password",
    resetPassword: "api/auth/reset-password",
  },
  news: {
    list: "api/article",
    detail: "api/article",
  },
  user: {
    list: "api/user",
    delete: "api/user/soft-delete",
  },
  dapil: {
    url: "api/master/dapil",
    total: "api/master/dapil/user/total",
    bagan: "api/user/bagan",
  },
  fraksi: {
    url: "api/master/fraksi",
  },
  kecamatan: {
    url: "api/master/kecamatan",
  },
  komisi: {
    url: "api/master/komisi",
  },
  activity: {
    list: "api/log-activity",
  },
  notifikasi: {
    list: "api/notification",
  },
  aspirasi: {
    url: "api/aspiration",
    anggota: "api/aspiration/anggota",
    add: "api/master/category-aspiration",
    delete: "api/master/category-aspiration",
    list: "api/master/category-aspiration",
  },
  report: {
    url: "api/report",
  },
  createUser: {
    url: "api/user",
  },
  discussion: {
    url: "api/discussion",
  },
  akses: {
    list: "api/role-access",
  },
  section: {
    update: "api/master/hero",
  },
  anggota: {
    list: "api/user",
  },
};
