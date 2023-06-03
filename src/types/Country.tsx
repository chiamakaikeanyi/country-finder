export interface ICountry {
  name: {
    common: string;
    nativeName: Record<string, Record<string, string>>;
  };
  capital: string;
  cca3: string;
  currencies: {
    name: string;
  };
  flags: {
    alt: string;
    svg: string;
  };
  borders: string[] | null;
  continents: string[];
  languages: Record<string, string>;
  timezones: string[];
  tld: string[];
  population: number;
  region: string;
  subregion: string;
  car: {
    side: string;
  };
}
