export type UserDetail = {
  id: number;
  name: string;
  email: string;
  gender: string;
  dapil: any;
  isActive: boolean;
};
  
export type User = {
  items: UserDetail[];
}