import React, { useState, useEffect } from "react";
import Countries from "./countries";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [continent, setContinent] = useState("");
  const [subregion, setSubregion] = useState("");
  const [sortOrder, setSortOrder] = useState("alphabetical");
  const [topFilter, setTopFilter] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleFilter = () => {
    let result = [...countries];

    if (continent) {
      result = result.filter((country) => country.continents.includes(continent));
      setSubregion(""); // Clear subregion when continent is selected
    }

    if (subregion) {
      result = result.filter((country) => country.subregion === subregion);
      setContinent(""); // Clear continent when subregion is selected
    }

    if (topFilter === "population") {
      result = [...result].sort((a, b) => b.population - a.population).slice(0, 10);
    } else if (topFilter === "area") {
      result = [...result].sort((a, b) => b.area - a.area).slice(0, 10);
    }

    if (sortOrder === "alphabetical") {
      result = [...result].sort((a, b) => a.name.common.localeCompare(b.name.common));
    }

    setFilteredCountries(result);
  };

  useEffect(() => {
    handleFilter();
  }, [continent, subregion, sortOrder, topFilter]);

  return (
    <div className="app-container">
      <h1 className="app-heading">Countries of the World</h1>
      <div className="app-filters">
        <label>
          Filter by Continent:
          <select
            value={continent}
            onChange={(e) => setContinent(e.target.value)}
            className="app-select"
          >
            <option value="">All</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="Oceania">Oceania</option>
            <option value="South America">South America</option>
          </select>
        </label>

        <label>
          Filter by Subregion:
          <select
            value={subregion}
            onChange={(e) => setSubregion(e.target.value)}
            className="app-select"
          >
            <option value="">All</option>
            <option value="Northern Africa">Northern Africa</option>
            <option value="Sub-Saharan Africa">Sub-Saharan Africa</option>
            <option value="Caribbean">Caribbean</option>
            <option value="Central America">Central America</option>
            <option value="South America">South America</option>
            <option value="Northern America">Northern America</option>
            <option value="Central Asia">Central Asia</option>
            <option value="Eastern Asia">Eastern Asia</option>
            <option value="South-Eastern Asia">South-Eastern Asia</option>
            <option value="Southern Asia">Southern Asia</option>
            <option value="Western Asia">Western Asia</option>
            <option value="Eastern Europe">Eastern Europe</option>
            <option value="Northern Europe">Northern Europe</option>
            <option value="Southern Europe">Southern Europe</option>
            <option value="Western Europe">Western Europe</option>
            <option value="Australia and New Zealand">Australia and New Zealand</option>
            <option value="Melanesia">Melanesia</option>
            <option value="Micronesia">Micronesia</option>
            <option value="Polynesia">Polynesia</option>
            <option value="Antarctica">Antarctica</option>
          </select>
        </label>

        <label>
          Top 10 by:
          <select
            value={topFilter}
            onChange={(e) => setTopFilter(e.target.value)}
            className="app-select"
          >
            <option value="">None</option>
            <option value="population">Population</option>
            <option value="area">Area</option>
          </select>
        </label>

        <label>
          Sort Alphabetically:
          <input
            type="checkbox"
            checked={sortOrder === "alphabetical"}
            onChange={(e) => setSortOrder(e.target.checked ? "alphabetical" : "")}
            className="app-checkbox"
          />
        </label>
      </div>
      <Countries countries={filteredCountries} />
    </div>
  );
};

export default App;
