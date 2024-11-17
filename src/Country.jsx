import React from "react";

const Country = ({ country }) => {
    // Generate Google Maps URL
    const googleMapsUrl = `https://www.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}`;

    return (
        <div style={{ border: "1px solid #ccc", padding: "16px", width: "300px" }}>
            <img
                src={country.flags.svg}
                alt={`Flag of ${country.name.common}`}
                style={{ width: "100%" }}
            />
            <h3>{country.name.common}</h3>
            <p>Capital: {country.capital?.[0] || "N/A"}</p>
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Area: {country.area.toLocaleString()} km²</p>
            <p>Continent: {country.continents.join(", ")}</p>
            <p>Subregion: {country.subregion || "N/A"}</p>
            <p>
                Languages:{" "}
                {country.languages
                    ? Object.values(country.languages).join(", ")
                    : "N/A"}
            </p>
            <p>
                Borders:{" "}
                {country.borders && country.borders.length > 0
                    ? country.borders.join(", ")
                    : "No Borders"}
            </p>
            <p>
                Location:{" "}
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    View on Google Maps
                </a>
            </p>
        </div>
    );
};

export default Country;
