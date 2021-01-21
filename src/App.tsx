import React, { useState, useEffect } from 'react';
import './App.css';
import { Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ConfirmedCases from './components/ConfirmedCases';
import CasesPerCapita from './components/CasesPerCapita';
import Deaths from './components/Deaths';
import DeathRate from './components/DeathRate';
import About from './components/About';
import Popup from './components/Popup';
import Loading from './components/Loading';
import { parseCovidCountryData, addCountryColors } from './utils/arrayUtils';
import { getCovidData } from './utils/otherUtils';
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
  return (
    <Router>
      <Popup />
      <Navbar sticky="top" bg="dark" expand="xl" variant="dark">
        <Navbar.Brand id="headerBrand" href="">
          COVID-19 Europe
        </Navbar.Brand>
        <Navbar.Toggle className="headerToggle" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="text-center">
            <Button component={Link} to={'/confirmed_cases'} id="navButton">
              Confirmed Cases
            </Button>
            <Button component={Link} to={'/cases_per_capita'} id="navButton">
              Cases Per Capita
            </Button>
            <Button component={Link} to={'/deaths'} id="navButton">
              Deaths
            </Button>
            <Button component={Link} to={'/death_rate'} id="navButton">
              Death Rate
            </Button>
            <Button component={Link} to={'/about'} id="navButton">
              About
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
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
