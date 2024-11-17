import React from "react";
import Country from "./country";
const Countries = ({ countries }) => {
    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {countries.map((country) => (
                <Country key={country.cca3} country={country} />
            ))}
        </div>
    );
};

export default Countries;
