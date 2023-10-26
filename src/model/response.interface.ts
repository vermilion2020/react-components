export interface IAPIResponse {
  info: Info;
  results: IItem[];
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev?: null;
}

export interface IItem {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode?: string[] | null;
  url: string;
  created: string;
}
