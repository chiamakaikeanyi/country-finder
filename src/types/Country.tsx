export interface ICountry {
  cca3: string;
  flags: {
    alt: string;
    svg: string;
  };
  name: {
    common: string;
    nativeName: Record<string, Record<string, string>>;
  };
  population: number;
  region: string;
  subregion: string;
  capital: string;
  tld: string[];
  currencies: Record<string, Record<string, string>>;
  languages: Record<string, string>;
  car: {
    side: string;
  };
  timezones: string[];
  borders: string[] | null;
}
