export type AnggotaDetail = {
  id: number;
  name: string;
  imageUrl: string;
  fraksi: any;
  dapil: any;
  educations: any;
  userDPRDHistory: any;
  slug: string;
  phone: string;
  nip: string;
  ktp: string;
  placeOfBirth: string;
  dateOfBirth: any;
  komisi: string;
  address: string;
  age: string;
  position: any;
  userCurentAkd: any;
  gender: string
};
  
export type Anggota = {
  items: AnggotaDetail[];
}