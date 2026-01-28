import React, { useState, useMemo } from 'react';
import { countriesData } from './data/countries';
import CountrySelector from './components/CountrySelector';
import CategoryFilter from './components/CategoryFilter';
import Timeline from './components/Timeline';
import EventModal from './components/EventModal';

function App() {
  const [selectedCountry, setSelectedCountry] = useState('United Kingdom');
  const [category, setCategory] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const countries = Object.keys(countriesData);
  const categories = ['Conflict', 'Politics', 'Culture', 'Science'];

  const filteredEvents = useMemo(() => {
    const countryEvents = countriesData[selectedCountry] || [];
    if (category === 'All') {
      return countryEvents.sort((a, b) => a.year - b.year);
    }
    return countryEvents
      .filter(event => event.category === category)
      .sort((a, b) => a.year - b.year);
  }, [selectedCountry, category]);

  return (
    <div className="app-container">
      <header>
        <h1>World Timeline</h1>
      </header>

      <CountrySelector
        countries={countries}
        selectedCountry={selectedCountry}
        onSelect={setSelectedCountry}
      />

      <CategoryFilter
        categories={categories}
        selectedCategory={category}
        onSelect={setCategory}
      />

      <Timeline
        events={filteredEvents}
        onEventClick={setSelectedEvent}
      />

      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}

export default App;
