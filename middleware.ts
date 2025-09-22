// src/app/middleware.ts
import { NextRequest, NextResponse } from "next/server";

// Routes yang tidak butuh autentikasi
const publicRoutes = ["/login", "/register", "/forgot-password"];

// Routes khusus admin
const adminRoutes = ["/admin", "/admin/dashboard"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🟠 Ambil token JWT dari cookies
  const token = req.cookies.get("token")?.value;

  // 🟡 Jika route public, lewati pengecekan
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // 🔴 Jika butuh autentikasi tetapi tidak ada token
  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🟣 Jika halaman admin, periksa role dari cookie
  const userRole = req.cookies.get("role")?.value;

  if (adminRoutes.includes(pathname) && userRole !== "admin") {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  // ✅ Lanjutkan request
  return NextResponse.next();
}

// Konfigurasi matcher (pantau semua kecuali API, statis, dsb.)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
