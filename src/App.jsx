import React, { useState, useMemo } from 'react';
import { countriesData } from './data/countries';
import CountrySelector from './components/CountrySelector';
import CategoryFilter from './components/CategoryFilter';
import Timeline from './components/Timeline';
import EventModal from './components/EventModal';
import BackgroundImage from './components/BackgroundImage';
import { useWikipediaImage } from './hooks/useWikipediaImage';

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

  // Determine the display title
  const displayTitle = (focusedEvent && focusedEvent.historicalName)
    ? focusedEvent.historicalName
    : selectedCountry;

  // Determine background image query
  // Priority: Focused Event Query -> Focused Event Title -> First Event Query -> First Event Title
  const activeEvent = focusedEvent || filteredEvents[0];
  const bgQuery = activeEvent?.imageQuery || activeEvent?.title;
  const fallbackImage = activeEvent?.image || null;

  // Use hook to get dynamic image
  const bgImage = useWikipediaImage(bgQuery, fallbackImage);

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
          setFocusedEvent(null);
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
