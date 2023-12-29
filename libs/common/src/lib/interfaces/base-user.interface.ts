export interface IBaseUser {
  id: string;
  email: string;
  name: string;
  password: string;
  role: any;
  status: any;
  createdAt: Date;
  updatedAt: Date;
}
