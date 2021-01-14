const About = () => {
  return (
    <div id="about">
      <h1>Data</h1>
      <p>
        Data regarding COVID-19 was retrieved from{' '}
        <a href="https://github.com/CSSEGISandData/COVID-19">Johns Hopkins University, Center for Systems Science and Engineering.</a> The
        data is updated continuously.
      </p>
      <p>
        The map data comes from <a href="http://www.naturalearthdata.com/">Natural Earth</a> which is a public domain map dataset.
      </p>
      <h1>Map Presentation</h1>
      <p>
        The maps have been generalized to accomodate for the fact that the COVID-19 data are based on the mainlands of respective country.
        Many small islands are not included as a result.
      </p>
      <div className="footer">&copy; {new Date().getFullYear()} Copyright: Mikael Erik Svensson</div>
    </div>
  );
};
export default About;
