import { z } from "zod";

export const aspirasiSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  ktp: z.string().min(1, "KTP wajib diisi"),
  phone: z.string().min(1, "Phone wajib diisi"),
  proposal: z.string().min(1, "Usulan wajib diisi"),
  description: z.string().min(1, "Uraian permasalahan wajib diisi"),
  address: z.string().min(1, "Alamat wajib diisi"),
  // kabupaten: z.string().refine((val) => val !== "", {
  //   message: "Kabupaten wajib diisi",
  // }),
  village: z.string().refine((val) => val !== "", {
    message: "Kelurahan wajib diisi",
  }),
  subDistrict: z.string().refine((val) => val !== "", {
    message: "Kecamatan wajib diisi",
  }),
  // desa: z.string().refine((val) => val !== "", {
  //   message: "Desa wajib diisi",
  // }),
  categoryAspirationId: z.string().refine((val) => val !== "", {
    message: "Aspirasi wajib diisi",
  }),
  dapilId: z.string().refine((val) => val !== "", {
    message: "Dapil wajib diisi",
  }),
  anggota: z.string().refine((val) => val !== "", {
    message: "Anggota wajib diisi",
  }),
});
