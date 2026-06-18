import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Map as MapIcon, 
  Compass, 
  BookOpen, 
  Home, 
  Coffee, 
  Navigation, 
  Cpu, 
  Sparkles, 
  ExternalLink,
  AlertTriangle
} from 'lucide-react';
import { MapPoint } from '../types';
import { CAMPUS_MAP_SPOTS } from '../data';

// Import Leaflet dependencies
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Map controller to pan and update map position dynamically on selection
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);
  return null;
}

// Custom gold vector marker icon to avoid default Leaflet path/import issues
const goldIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
      <defs>
        <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#F1C679" stop-opacity="1"/>
          <stop offset="100%" stop-color="#D9B15D" stop-opacity="0.1"/>
        </radialGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#goldGlow)" />
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#D9B15D" stroke="#07111F" stroke-width="1.5"/>
    </svg>
  `),
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -32],
});

export default function InteractiveMap() {
  const [selectedSpot, setSelectedSpot] = useState<MapPoint>(CAMPUS_MAP_SPOTS[0]);
  const [mapError, setMapError] = useState(false);

  // Active center for selected nodes
  const mapCenter: [number, number] = [
    selectedSpot.lat || 12.9917,
    selectedSpot.lng || 80.2337
  ];

  // Monitor network/connectivity state
  useEffect(() => {
    if (!navigator.onLine) {
      setMapError(true);
    }
    
    const handleOffline = () => setMapError(true);
    const handleOnline = () => setMapError(false);
    
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <div id="iit-madras-blueprint-map" className="w-full max-w-7xl mx-auto px-4 md:px-6 mt-8">
      {/* Custom Styles for styling the Leaflet components into navy/gold theme */}
      <style>{`
        .leaflet-container {
          background: #07111F !important;
          border-radius: inherit;
        }
        .custom-leaflet-tooltip {
          background-color: #101D34 !important;
          border: 1px solid rgba(217,177,93,0.4) !important;
          color: #fff !important;
          font-family: monospace !important;
          font-size: 10px !important;
          font-weight: bold !important;
          border-radius: 6px !important;
          padding: 4px 8px !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5) !important;
          white-space: nowrap !important;
        }
        .custom-leaflet-tooltip::before {
          border-top-color: #101D34 !important;
        }
        /* Custom map zoom button theme */
        .leaflet-bar a {
          background-color: #101D34 !important;
          border-bottom: 1px solid rgba(255,255,255,0.08) !important;
          color: #D9B15D !important;
        }
        .leaflet-bar a:hover {
          background-color: #1b2e4c !important;
          color: #F1C679 !important;
        }
        .leaflet-bar {
          border: 1px solid rgba(255,255,255,0.1) !important;
          box-shadow: none !important;
        }
      `}</style>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Card: 8-columns Interactive Real Map */}
        <div id="blueprint-map-card" className="lg:col-span-8 bg-[#101D34]/90 border border-white/8 rounded-2xl p-6 md:p-8 shadow-2xl relative flex flex-col justify-between overflow-hidden">
          {/* Subtle circuit lines background */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none"></div>
          
          <div className="flex items-center justify-between mb-6 z-10">
            <div>
              <span className="text-[10px] font-mono text-[#D9B15D] tracking-widest font-semibold uppercase">INTERACTIVE PROTOCOL // REAL GEOLOCATION HUB</span>
              <h4 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-[#D9B15D]" /> Explore IIT Madras Map
              </h4>
            </div>
            <div className="hidden sm:block text-right">
              <span className="text-xs font-mono text-[#93A4BC]">LIVE OSM COMPILING ENGINE</span>
              <p className="text-[10px] font-mono text-[#D9B15D]">{selectedSpot.coordinates}</p>
            </div>
          </div>

          {/* Interactive Map Wrapper aspect contain */}
          <div className="bg-[#07111F] rounded-2xl border border-white/5 relative aspect-[16/9] overflow-hidden group shadow-inner mb-6 flex flex-col justify-between">
            
            {mapError ? (
              <div id="map-fallback-error" className="w-full h-full min-h-[300px] flex flex-col items-center justify-center text-center p-8 bg-[#07111F]">
                <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl max-w-md">
                  <AlertTriangle className="w-12 h-12 text-[#D9B15D] mx-auto mb-4 animate-pulse" />
                  <h5 className="text-white font-bold text-sm uppercase font-mono mb-2">SCHEMATIC LOAD FAILURE</h5>
                  <p className="text-xs text-[#93A4BC] leading-relaxed">
                    Unable to load map. Please check internet connection.
                  </p>
                </div>
              </div>
            ) : (
              <div id="leaflet-map-element-container" className="w-full h-full relative" style={{ minHeight: "300px" }}>
                <MapContainer
                  center={[12.9917, 80.2337]}
                  zoom={12}
                  style={{ width: '100%', height: '100%' }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    eventHandlers={{
                      tileerror: () => {
                        setMapError(true);
                      }
                    }}
                  />
                  
                  {/* Map Updater to dynamically re-focus on clicked spots */}
                  <MapController center={mapCenter} />

                  {/* High Quality Gold Leaflet Markers */}
                  {CAMPUS_MAP_SPOTS.map((spot) => {
                    const lat = spot.lat || 12.9917;
                    const lng = spot.lng || 80.2337;
                    return (
                      <Marker
                        key={spot.id}
                        position={[lat, lng]}
                        icon={goldIcon}
                        eventHandlers={{
                          click: () => {
                            setSelectedSpot(spot);
                          }
                        }}
                      >
                        {/* Always display tooltip on hover */}
                        <Tooltip
                          direction="top"
                          offset={[0, -32]}
                          opacity={0.95}
                          className="custom-leaflet-tooltip"
                        >
                          <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#D9B15D]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            {spot.name}
                          </div>
                        </Tooltip>
                      </Marker>
                    );
                  })}
                </MapContainer>
              </div>
            )}
          </div>

          {/* Quick interactive location nodes selection row */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4 mb-4 pt-4 border-t border-white/5 z-10 relative">
            {CAMPUS_MAP_SPOTS.map((spot, idx) => {
              const isSelected = selectedSpot.id === spot.id;
              return (
                <button
                  key={spot.id}
                  id={`map-node-btn-${spot.id}`}
                  onClick={() => setSelectedSpot(spot)}
                  type="button"
                  className={`p-2.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                    isSelected 
                      ? 'bg-[#D9B15D]/10 border-[#D9B15D] shadow-[0_0_15px_rgba(217,177,93,0.1)]' 
                      : 'bg-[#07111F]/60 border-white/5 hover:border-[#D9B15D]/30 hover:bg-[#101D34]'
                  }`}
                >
                  <div className="text-[9px] font-mono text-[#D9B15D] font-bold mb-0.5">0{idx + 1} // NODE</div>
                  <div className="text-[10px] font-bold text-white tracking-tight uppercase truncate">{spot.name.replace(" ROOMS", "").replace(" SYSTEM", "")}</div>
                  <div className="text-[9px] font-mono text-[#93A4BC] uppercase scale-90 origin-left mt-0.5">{spot.category}</div>
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-[#93A4BC] font-mono italic flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#D9B15D] shrink-0" /> Note: Touch or click any custom gold beacon marker over the OpenStreetMap vector layer to geolocate coordinates.
          </p>
        </div>

        {/* Right Card: 4-columns Spot Details Panel */}
        <div id="blueprint-details-card" className="lg:col-span-4 bg-[#101D34]/90 border border-white/8 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSpot.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[10px] font-mono tracking-widest font-semibold uppercase px-2 py-0.5 rounded-md ${
                    selectedSpot.category === 'academic' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/15' :
                    selectedSpot.category === 'residential' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/15' :
                    selectedSpot.category === 'social' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15' :
                    'bg-purple-500/10 text-purple-400 border border-purple-500/15'
                  }`}>
                    {selectedSpot.category}
                  </span>
                  <span className="text-[10px] font-mono text-[#93A4BC]">{selectedSpot.coordinates}</span>
                </div>

                <h4 className="text-xl font-bold text-white font-display tracking-tight uppercase border-b border-white/5 pb-3 mb-4">
                  {selectedSpot.name}
                </h4>

                <p className="text-sm text-[#D8E3F2] leading-relaxed mb-4">
                  {selectedSpot.description}
                </p>

                <p className="text-xs text-[#93A4BC] leading-relaxed bg-[#07111F]/50 p-4 rounded-xl border border-white/5 font-sans mb-6">
                  {selectedSpot.fullDetail}
                </p>
              </div>

              {/* Immersive specs & Trivia */}
              <div className="bg-[#07111F] rounded-xl border border-white/5 p-4 mt-auto">
                <span className="text-[9px] font-mono text-[#D9B15D] tracking-wider block font-semibold uppercase mb-1">Interactive Trivia Fact</span>
                <p className="text-[11px] text-[#D8E3F2] font-mono leading-relaxed">
                  {selectedSpot.id === 'm_shakti' && "This is the flagship birthplace of Shakti - India's first ever domestically designed corporate-grade microprocessor!"}
                  {selectedSpot.id === 'm_iitm' && "A serene 617-acre sanctuary home to majestic blackbucks, spotted deer, and wild jungle cats."}
                  {selectedSpot.id === 'm_research_park' && "Collaborative deep tech environment supporting world-class semiconductor, battery, and AI startups."}
                  {selectedSpot.id === 'm_marina_beach' && "Located a short drive from the IITM campus, offering a breezy seaside getaway after rigorous software tape-out sessions."}
                  {selectedSpot.id === 'm_phoenix_mall' && "Features premier dining options, massive screens, and arcade hubs perfect for weekend socializations."}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
