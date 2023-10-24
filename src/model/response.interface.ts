export interface IAPIResponse {
  page: Page;
  sort: Sort;
  episodes: IEpisode[];
}

export interface IEpisode {
  uid: string;
  title: string;
  titleGerman: string;
  titleItalian: null | string;
  titleJapanese: null | string;
  series: Season;
  season: Season;
  seasonNumber: number;
  episodeNumber: number;
  productionSerialNumber: string;
  featureLength: boolean;
  stardateFrom: number | null;
  stardateTo: number | null;
  yearFrom: number | null;
  yearTo: number | null;
  usAirDate: Date;
  finalScriptDate: null;
}

export interface Season {
  uid: string;
  title: string;
}

export interface Page {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;
}

export interface Sort {
  clauses: string[];
}
