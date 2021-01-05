export type Country = {
  country: string;
  ISO3: string;
  confirmed: number;
  deaths: number;
  deathRate: number;
  geometry: {
    type: string;
    coordinates: number[][];
  };
  properties: {
    ADMIN: string;
    ISO_A3: string;
  };
  type: string;
  casesPerCapita: number;
};

export type ColoredCountry = Country & {
  confirmedColor: string;
  casesPerCapitaColor: string;
  deathsColor: string;
  deathRateColor: string;
};

export type MapProps = {
  coloredCountries: ColoredCountry[];
};
