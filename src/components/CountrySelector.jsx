import React from 'react';
import { motion } from 'framer-motion';

const CountrySelector = ({ countries, selectedCountry, onSelect }) => {
    return (
        <div className="country-selector">
            <h2 className="selector-title">Select a Country</h2>
            <div className="country-list">
                {countries.map((country) => (
                    <motion.button
                        key={country}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`country-btn ${selectedCountry === country ? 'active' : ''}`}
                        onClick={() => onSelect(country)}
                    >
                        {country}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default CountrySelector;
