export type NotifikasiDetail = {
  id: number;
  title: string;
  category: string;
  date: string;
  description: string;
  imageUrl: string
};
  
export type Notifikasi = {
  items: NotifikasiDetail[];
}