import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ConfirmedCases from './components/ConfirmedCases';
import ConfirmedPerCapita from './components/CasesPerCapita';
import Loading from './components/Loading';
import Deaths from './components/Deaths';
import DeathRate from './components/DeathRate';
import About from './components/About';
import { parseCovidCountryData, setCountryColors } from './utils/arrayUtils';
import { getCovidData } from './utils/otherUtils';
import { ColoredCountry } from './types/main';
import { countryPolygons, covidDataUrl, countryPopulations } from './utils/otherUtils';
import CasesPerCapita from './components/CasesPerCapita';

const useStyles = makeStyles((theme) => ({
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

function App() {
  const [coloredCountries, setColoredCountries] = useState<ColoredCountry[]>();

  useEffect(() => {
    getCovidData(covidDataUrl).then((result) => {
      const parsedResult = parseCovidCountryData(result, countryPolygons, countryPopulations);
      setColoredCountries(setCountryColors(parsedResult));
    });
  }, []);
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.root}>
        <AppBar style={{ background: '#292b2c' }} position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Covid-19 Europe
            </Typography>
            <Button component={Link} to={'/confirmed_cases'} color="inherit">
              Confirmed Cases
            </Button>
            <Button component={Link} to={'/cases_per_capita'} color="inherit">
              Cases Per Capita
            </Button>
            <Button component={Link} to={'/deaths'} color="inherit">
              Deaths
            </Button>
            <Button component={Link} to={'/death_rate'} color="inherit">
              Death Rate
            </Button>
            <Button component={Link} to={'/about'} color="inherit">
              About
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      {typeof coloredCountries !== 'undefined' ? (
        <Switch>
          <Route exact path="/">
            <ConfirmedCases coloredCountries={coloredCountries} />
          </Route>
          <Route exact path="/confirmed_cases">
            <ConfirmedCases coloredCountries={coloredCountries} />
          </Route>
          <Route exact path="/cases_per_capita">
            <CasesPerCapita coloredCountries={coloredCountries} />
          </Route>
          <Route exact path="/deaths">
            <Deaths coloredCountries={coloredCountries} />
          </Route>
          <Route exact path="/death_rate">
            <DeathRate coloredCountries={coloredCountries} />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
      ) : (
        <Loading />
      )}
    </Router>
  );
}

export default App;
