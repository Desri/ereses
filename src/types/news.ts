export type NewsDetail = {
  id: number;
  title: string;
  category: string;
  date: string;
  categoryArticle: any;
  description: string;
  imageUrl: any
};
  
export type News = {
  items: NewsDetail[];
}