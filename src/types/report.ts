export type ReportDetail = {
  id: number;
  userId: number;
  name: string;
  ktp: string;
  phone: string;
  regency: string;
  district: string;
  subDistrict: string;
  village: string;
  dapilId: number;
  category: string;
  proposal: string;
  description: string;
  imagesUrl: string;
  levelUrgency: string;
  status: string;
  note: string;
  createdAt: string;
  updatedAt: string;
};
  
export type Report = {
  items: ReportDetail[];
}