export type AktivitasDetail = {
  id: number;
  title: string;
  category: string;
  date: string;
  description: string;
  time: any;
  imageUrl: string
};
  
export type Aktivitas = {
  items: AktivitasDetail[];
}