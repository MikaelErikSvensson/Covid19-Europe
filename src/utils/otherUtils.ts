import papa from 'papaparse';
import { features } from '../data/countries.json';
import population from '../data/population.json';
import { makeStyles } from '@material-ui/core/styles';

export const getCovidData = (covidDataUrl: string) =>
  new Promise((resolve) => {
    papa.parse(covidDataUrl, {
      download: true,
      header: true,
      complete: (result) => resolve(result.data),
    });
  });

export const countryStyle = {
  fillColor: 'white',
  fillOpacity: 1,
  color: 'black',
  weight: 1,
};
export const useStylesAppBar = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
export const mapUrl = `https://api.mapbox.com/styles/v1/mikaeleriksvensson/ckj8rh9p293g319mqo9urbxmh/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAP_KEY}`;
export const covidDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv';
export const countryPolygons = features;
export const countryPopulations = population.filter((x: any) => x.Year === 2018);
