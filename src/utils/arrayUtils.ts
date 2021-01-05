import { ColoredCountry, Country } from '../types/main';
import { findMax } from './numberUtils';

export const setCountryColors = (parsedResult: Country[]): ColoredCountry[] => {
  return addConfirmedColors(addDeathsColors(addDeathRateColors(addCasesPerCapitaColors(parsedResult))));
};

export const parseCovidCountryData = (covidData: any, countryPolygons: any, countryPopulations: any): Country[] => {
  const covidCountries = countryPolygons.map((x: any) => ({ ...covidData.find((y: any) => y.ISO3 === x.properties.ISO_A3), ...x }));
  const popCountries = covidCountries.map((x: any) => ({ ...countryPopulations.find((y: any) => y['Country Code'] === x.ISO3), ...x }));

  const result = popCountries.map((x: any) => {
    return {
      geometry: x.geometry,
      properties: x.properties,
      type: x.type,
      country: x.Country_Region,
      ISO3: x.ISO3,
      confirmed: parseInt(x.Confirmed),
      deaths: parseInt(x.Deaths),
      deathRate: Math.round((x.Deaths / x.Confirmed) * 100),
      casesPerCapita: Math.round((parseInt(x.Confirmed) / x.Value) * 100),
    };
  });
  return result.filter((x: Country) => x.ISO3 !== undefined);
};

export const addConfirmedColors = (array: Country[]) => {
  const max = findMax(array, (x: Country) => {
    if (Number.isNaN(x.confirmed)) {
      return 0;
    } else {
      return x.confirmed;
    }
  });

  const intervalConfirmedCases = max / 9;
  return array.map((x: any) => {
    if (x.confirmed >= intervalConfirmedCases * 8) {
      x['confirmedColor'] = '#680c0d';
      return x;
    } else if (x.confirmed >= intervalConfirmedCases * 7) {
      x['confirmedColor'] = '#802e16';
      return x;
    } else if (x.confirmed >= intervalConfirmedCases * 6) {
      x['confirmedColor'] = '#8b3d1b';
      return x;
    } else if (x.confirmed >= intervalConfirmedCases * 5) {
      x['confirmedColor'] = '#a15b27';
      return x;
    } else if (x.confirmed >= intervalConfirmedCases * 4) {
      x['confirmedColor'] = '#b67936';
      return x;
    } else if (x.confirmed >= intervalConfirmedCases * 3) {
      x['confirmedColor'] = '#ab7a4a';
      return x;
    } else if (x.confirmed >= intervalConfirmedCases * 2) {
      x['confirmedColor'] = '#c29f5e';
      return x;
    } else if (x.confirmed >= intervalConfirmedCases * 1) {
      x['confirmedColor'] = '#d8c372';
      return x;
    } else if (x.confirmed < intervalConfirmedCases * 1 && x.confirmed > 0) {
      x['confirmedColor'] = '#efe886';
      return x;
    } else x['confirmedColor'] = '#ffffff';
    return x;
  });
};

export const addCasesPerCapitaColors = (array: Country[]) => {
  const max = findMax(array, (x: Country) => {
    if (Number.isNaN(x.casesPerCapita)) {
      return 0;
    } else {
      return x.casesPerCapita;
    }
  });

  const intervalcasesPerCapita = max / 9;
  return array.map((x: any) => {
    if (x.casesPerCapita >= intervalcasesPerCapita * 8) {
      x['casesPerCapitaColor'] = '#680c0d';
      return x;
    } else if (x.casesPerCapita >= intervalcasesPerCapita * 7) {
      x['casesPerCapitaColor'] = '#802e16';
      return x;
    } else if (x.casesPerCapita >= intervalcasesPerCapita * 6) {
      x['casesPerCapitaColor'] = '#8b3d1b';
      return x;
    } else if (x.casesPerCapita >= intervalcasesPerCapita * 5) {
      x['casesPerCapitaColor'] = '#a15b27';
      return x;
    } else if (x.casesPerCapita >= intervalcasesPerCapita * 4) {
      x['casesPerCapitaColor'] = '#b67936';
      return x;
    } else if (x.casesPerCapita >= intervalcasesPerCapita * 3) {
      x['casesPerCapitaColor'] = '#ab7a4a';
      return x;
    } else if (x.casesPerCapita >= intervalcasesPerCapita * 2) {
      x['casesPerCapitaColor'] = '#c29f5e';
      return x;
    } else if (x.casesPerCapita >= intervalcasesPerCapita * 1) {
      x['casesPerCapitaColor'] = '#d8c372';
      return x;
    } else if (x.casesPerCapita < intervalcasesPerCapita * 1 && x.casesPerCapita > 0) {
      x['casesPerCapitaColor'] = '#efe886';
      return x;
    } else x['casesPerCapitaColor'] = '#ffffff';
    return x;
  });
};

export const addDeathsColors = (array: Country[]) => {
  const max = findMax(array, (x: Country) => {
    if (Number.isNaN(x.deaths)) {
      return 0;
    } else {
      return x.deaths;
    }
  });

  const intervalDeaths = max / 6;
  return array.map((x: any) => {
    if (x.deaths >= intervalDeaths * 5) {
      x['deathsColor'] = '#004625';
      return x;
    } else if (x.deaths >= intervalDeaths * 4) {
      x['deathsColor'] = '#2b6541';
      return x;
    } else if (x.deaths >= intervalDeaths * 3) {
      x['deathsColor'] = '#55845d';
      return x;
    } else if (x.deaths >= intervalDeaths * 2) {
      x['deathsColor'] = '#80a278';
      return x;
    } else if (x.deaths >= intervalDeaths * 1) {
      x['deathsColor'] = '#aac194';
      return x;
    } else if (x.deaths < intervalDeaths * 1 && x.deaths > 0) {
      x['deathsColor'] = '#ffffcc';
      return x;
    } else x['deathsColor'] = '#ffffff';
    return x;
  });
};

export const addDeathRateColors = (array: Country[]) => {
  const max = findMax(array, (x: Country) => {
    if (Number.isNaN(x.deathRate)) {
      return 0;
    } else {
      return x.deathRate;
    }
  });

  const intervalDeathRate = max / 7;
  return array.map((x: any) => {
    if (x.deathRate >= intervalDeathRate * 6) {
      x['deathRateColor'] = '#1a3a46';
      return x;
    } else if (x.deathRate >= intervalDeathRate * 5) {
      x['deathRateColor'] = '#30555f';
      return x;
    } else if (x.deathRate >= intervalDeathRate * 4) {
      x['deathRateColor'] = '#467078';
      return x;
    } else if (x.deathRate >= intervalDeathRate * 3) {
      x['deathRateColor'] = '#6c8e94';
      return x;
    } else if (x.deathRate >= intervalDeathRate * 2) {
      x['deathRateColor'] = '#87aaae';
      return x;
    } else if (x.deathRate >= intervalDeathRate * 1) {
      x['deathRateColor'] = '#a3c6c8';
      return x;
    } else if (x.deathRate < intervalDeathRate * 1 && x.deathRate > 0) {
      x['deathRateColor'] = '#bee2e2';
      return x;
    } else x['deathRateColor'] = '#ffffff';
    return x;
  });
};
