import React from 'react';
import { motion } from 'framer-motion';

const CategoryFilter = ({ categories, selectedCategory, onSelect }) => {
    return (
        <div className="category-filter">
            <button
                className={`filter-btn ${selectedCategory === 'All' ? 'active' : ''}`}
                onClick={() => onSelect('All')}
            >
                All
            </button>
            {categories.map(cat => (
                <button
                    key={cat}
                    className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => onSelect(cat)}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
