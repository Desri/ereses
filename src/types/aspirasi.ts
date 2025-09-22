export type AspirasiDetail = {
  id: number;
  anggota: any;
  userId: number;
  name: string;
  ktp: string;
  phone: string;
  regency: string;
  district: string;
  subDistrict: string;
  village: string;
  dapilId: number;
  dapil: any;
  category: string;
  address: string;
  proposal: string;
  categoryAspiration: any;
  description: string;
  imagesUrl: any;
  levelUrgency: string;
  dokumenUrl: string;
  status: string;
  note: string;
  createdAt: string;
  updatedAt: string;
};
  
export type Aspirasi = {
  items: AspirasiDetail[];
}