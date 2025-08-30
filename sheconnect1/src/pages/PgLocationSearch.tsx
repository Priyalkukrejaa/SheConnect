import React, { useState } from 'react';
import { MapPin, Search, Home } from 'lucide-react';

interface Location {
  display_name: string;
  lat: string;
  lon: string;
}

const PgLocationSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      // Using Nominatim API for location search
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=10`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      // Filter results to prioritize PG/Hostel related locations
      const pgResults = data.filter((place: any) => 
        place.display_name.toLowerCase().includes('pg') ||
        place.display_name.toLowerCase().includes('hostel') ||
        place.display_name.toLowerCase().includes('accommodation') ||
        place.display_name.toLowerCase().includes('lodging')
      );
      
      // If we found PG-specific results, use those; otherwise use all results
      setResults(pgResults.length > 0 ? pgResults : data);
    } catch (error) {
      console.error('Error fetching location:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setResults([]);
    setQuery(location.display_name);
  };

  const clearSelection = () => {
    setSelectedLocation(null);
    setQuery('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl p-6 shadow-lg mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">PG Location Finder</h1>
              <p className="text-pink-100">Find safe accommodations near you</p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-pink-100 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Search for PG Accommodations</h2>
          <p className="text-gray-600 mb-4">Find safe and verified PG accommodations near your preferred location</p>
          
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter city, area, or landmark..."
                  className="w-full p-4 pr-12 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-400 w-5 h-5" />
              </div>
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 text-white px-6 py-4 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </>
              )}
            </button>
          </div>

          {selectedLocation && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-green-800 mb-1">Selected Location</h3>
                  <p className="text-green-700">{selectedLocation.display_name}</p>
                  <p className="text-sm text-green-600 mt-1">
                    Coordinates: {selectedLocation.lat}, {selectedLocation.lon}
                  </p>
                </div>
                <button 
                  onClick={clearSelection}
                  className="text-green-600 hover:text-green-800"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-pink-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {results.length > 0 ? 'Search Results' : 'Search Tips'}
          </h3>
          
          {results.length > 0 ? (
            <ul className="space-y-3">
              {results.map((place, index) => (
                <li 
                  key={index} 
                  className="p-4 border border-pink-100 rounded-lg hover:bg-pink-50 cursor-pointer transition-colors"
                  onClick={() => handleLocationSelect(place)}
                >
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-pink-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">{place.display_name}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Coordinates: {place.lat}, {place.lon}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8">
              <MapPin className="w-12 h-12 text-pink-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                {query ? 'No results found. Try a different search term.' : 'Enter a location to search for PG accommodations.'}
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h4 className="font-medium text-pink-800 mb-2">Search by City</h4>
                  <p className="text-sm text-pink-600">Try searching for major cities like "Bangalore", "Delhi", or "Mumbai"</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">Search by Area</h4>
                  <p className="text-sm text-purple-600">Search for specific areas like "Koramangala" or "Connaught Place"</p>
                </div>
                <div className="bg-rose-50 p-4 rounded-lg">
                  <h4 className="font-medium text-rose-800 mb-2">Search by Landmark</h4>
                  <p className="text-sm text-rose-600">Use landmarks like "Airport", "Railway Station", or "University"</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Safety Tips */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-pink-100 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Safety Tips for PG Accommodations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="bg-pink-100 p-2 rounded-full">
                <div className="w-5 h-5 text-pink-600">🔒</div>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Check Security Features</h4>
                <p className="text-sm text-gray-600">Ensure the PG has proper locks, security guards, and CCTV cameras</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-pink-100 p-2 rounded-full">
                <div className="w-5 h-5 text-pink-600">🏠</div>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Verify Ownership</h4>
                <p className="text-sm text-gray-600">Always verify the ownership documents and credentials</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-pink-100 p-2 rounded-full">
                <div className="w-5 h-5 text-pink-600">👥</div>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Meet Other Residents</h4>
                <p className="text-sm text-gray-600">If possible, meet other residents to get a feel for the place</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-pink-100 p-2 rounded-full">
                <div className="w-5 h-5 text-pink-600">📄</div>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Read Agreements Carefully</h4>
                <p className="text-sm text-gray-600">Understand all terms and conditions before signing any agreement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgLocationSearch;
