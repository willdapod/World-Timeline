import React, { useState, useMemo } from 'react';
import { countriesData } from './data/countries';
import CountrySelector from './components/CountrySelector';
import CategoryFilter from './components/CategoryFilter';
import Timeline from './components/Timeline';
import EventModal from './components/EventModal';
import BackgroundImage from './components/BackgroundImage';

function App() {
  const [selectedCountry, setSelectedCountry] = useState('United Kingdom');
  const [category, setCategory] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [focusedEvent, setFocusedEvent] = useState(null);

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

  // Determine the display title:
  // If we have a focused event with a historicalName different from current selectedCountry, show it.
  // Otherwise show selectedCountry.
  const displayTitle = (focusedEvent && focusedEvent.historicalName)
    ? focusedEvent.historicalName
    : selectedCountry;

  // Determine background image
  // Use focused event image, or fallback to first event image, or default
  const bgImage = focusedEvent?.image || (filteredEvents[0]?.image) || null;

  return (
    <div className="app-container">
      {bgImage && <BackgroundImage imageUrl={bgImage} />}

      <header>
        <h1>{displayTitle}</h1>
      </header>

      <CountrySelector
        countries={countries}
        selectedCountry={selectedCountry}
        onSelect={(c) => {
          setSelectedCountry(c);
          setFocusedEvent(null); // Reset focus on change
        }}
      />

      <CategoryFilter
        categories={categories}
        selectedCategory={category}
        onSelect={setCategory}
      />

      <Timeline
        events={filteredEvents}
        onEventClick={setSelectedEvent}
        onFocusedEvent={setFocusedEvent}
      />

      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}

export default App;
