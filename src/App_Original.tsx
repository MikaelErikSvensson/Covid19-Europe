import React, { useState, useEffect } from 'react';
import './App.css';

import { Navbar, Nav } from 'react-bootstrap';

import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ConfirmedCases from './components/ConfirmedCases';
import CasesPerCapita from './components/CasesPerCapita';
import Deaths from './components/Deaths';
import DeathRate from './components/DeathRate';
import About from './components/About';
import Loading from './components/Loading';
import { parseCovidCountryData, addCountryColors } from './utils/arrayUtils';
import { getCovidData, useStylesAppBar } from './utils/otherUtils';
import { ColoredCountry } from './types/main';
import { countryPolygons, covidDataUrl, countryPopulations } from './utils/otherUtils';

function App() {
  const [coloredCountries, setColoredCountries] = useState<ColoredCountry[]>();

  useEffect(() => {
    getCovidData(covidDataUrl).then((result) => {
      const parsedResult = parseCovidCountryData(result, countryPolygons, countryPopulations);
      setColoredCountries(addCountryColors(parsedResult));
    });
  }, []);
  const classes = useStylesAppBar();
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
