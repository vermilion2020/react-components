export interface IFormData {
  id: number;
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  tnc: boolean;
  image: string;
  country: string;
}

export interface ICountry {
  name: string;
  code: string;
}

export interface IAppState {
  countries: ICountry[],
  forms: IFormData[]
}