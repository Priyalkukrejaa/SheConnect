// src/components/LocationSearch.tsx
import React, { useState } from 'react';
interface Location {
  display_name: string;
  lat: string;
  lon: string;
}

interface Props {
  onSelectLocation: (location: string) => void;
}

const LocationSearch: React.FC<Props> = ({ onSelectLocation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);

  const handleSearch = async () => {
    if (!query) return;

const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Search Locations</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Enter location..."
          className="p-2 border rounded w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {results.length > 0 && (
        <ul className="mt-4 space-y-2">
          {results.map((place, index) => (
            <li
              key={index}
              className="p-2 border rounded bg-gray-100 cursor-pointer hover:bg-gray-200"
              onClick={() => onSelectLocation(place.display_name)}
            >
              <strong>{place.display_name}</strong><br />
              Lat: {place.lat}, Lon: {place.lon}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;