export type Inputs = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  tnc: boolean;
  image: Blob[];
  country: string;
}

export type FileResult = {
  name: string;
  size: number;
  type: string;
}[];