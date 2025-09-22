import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
  phone: z.string().min(1, "Nomor telepon wajib diisi"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  terms: z.literal(true, {
    errorMap: () => ({ message: "Anda harus menyetujui syarat dan ketentuan" }),
  }),
});
