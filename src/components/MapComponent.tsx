"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle, FeatureGroup, Polygon, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// Safe SVG DivIcons that never fail
const createCustomIcon = (color: string, emoji: string) => {
  return L.divIcon({
    className: "custom-leaflet-marker",
    html: `
      <div style="
        background: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid white;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      ">
        <span style="transform: rotate(45deg); font-size: 14px;">${emoji}</span>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const icons = {
  cadastral: createCustomIcon("#10b981", "📜"),
  climate: createCustomIcon("#ef4444", "🌱"),
  dispute: createCustomIcon("#f59e0b", "⚖️"),
  satellite: createCustomIcon("#0ea5e9", "🛰️"),
  urban: createCustomIcon("#8b5cf6", "🏙️"),
};

// Rich Cadastral & Land Record Points across India (Gujarat, MH, UP, Rajasthan, etc.)
const landParcels = [
  {
    id: "GJ-AHM-2026-8812",
    name: "Sanand Auto Corridor Parcel #142/A",
    district: "Ahmedabad Peri-Urban",
    state: "Gujarat",
    lat: 22.9868,
    lng: 72.3789,
    ulpin: "GJ-24-9988-142A",
    owner: "R. K. Patel & Co-Sharers",
    area: "14.2 Hectares",
    landUse: "Prime Irrigated Multi-Crop (Canal Linked)",
    climateScore: "66/100 (Heat Stress: 45.1°C)",
    disputeStatus: "Clear Title (NGDDRS Verified)",
    type: "cadastral"
  },
  {
    id: "GJ-KUT-2026-4410",
    name: "Bhuj Coastal Halophyte Farm #58/B",
    district: "Kutch",
    state: "Gujarat",
    lat: 23.2420,
    lng: 69.6669,
    ulpin: "GJ-01-4410-058B",
    owner: "Gujarat Agro-Forestry Trust",
    area: "32.0 Hectares",
    landUse: "Arid & Halophyte Solar Farm",
    climateScore: "52/100 (Salinity: 7.2 dS/m)",
    disputeStatus: "Section 14 NOC Approved",
    type: "climate"
  },
  {
    id: "GJ-BHA-2026-9021",
    name: "Bharuch Narmada Estuary Parcel #210/C",
    district: "Bharuch",
    state: "Gujarat",
    lat: 21.7051,
    lng: 72.9959,
    ulpin: "GJ-18-9021-210C",
    owner: "Desai Agro Marine",
    area: "18.5 Hectares",
    landUse: "Coastal Aquaculture & Mangrove Buffer",
    climateScore: "58/100 (Flood Inundation Risk: 88/100)",
    disputeStatus: "Boundary Dispute in e-Court",
    type: "dispute"
  },
  {
    id: "MH-PUN-2026-7734",
    name: "Haveli Peri-Urban Cadastral Plot #89",
    district: "Pune",
    state: "Maharashtra",
    lat: 18.5204,
    lng: 73.8567,
    ulpin: "MH-12-7734-089A",
    owner: "S. V. Deshmukh",
    area: "8.4 Hectares",
    landUse: "Commercial Non-Agri Zone",
    climateScore: "78/100 (Resilient)",
    disputeStatus: "Resolved in Lok Adalat (42 Days)",
    type: "dispute"
  },
  {
    id: "UP-VAR-2026-1120",
    name: "Varanasi Pindra Agricultural Khasra #302",
    district: "Varanasi",
    state: "Uttar Pradesh",
    lat: 25.3176,
    lng: 82.9739,
    ulpin: "UP-65-1120-302P",
    owner: "Tripathi Brothers",
    area: "5.6 Hectares",
    landUse: "Net Sown Paddy Farmland",
    climateScore: "74/100",
    disputeStatus: "Bhu-Aadhar Assigned (100% Surveyed)",
    type: "cadastral"
  },
  {
    id: "RJ-JOD-2026-5590",
    name: "Jodhpur Thar Shelterbelt Parcel #12",
    district: "Jodhpur",
    state: "Rajasthan",
    lat: 26.2389,
    lng: 73.0243,
    ulpin: "RJ-19-5590-012S",
    owner: "State Forest Conservation Board",
    area: "45.0 Hectares",
    landUse: "Sand Dune Afforestation Buffer",
    climateScore: "46/100 (Drought Risk: 96/100)",
    disputeStatus: "Government Reserved Forest",
    type: "climate"
  }
];

// Helper to trigger map pan
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 6, { duration: 1.2 });
  }, [center, map]);
  return null;
}

export default function MapComponent({ activeLayers }: { activeLayers?: Record<string, boolean> }) {
  const [mounted, setMounted] = useState(false);
  const [baseMapType, setBaseMapType] = useState<"osm" | "satellite">("osm");
  const [mapCenter, setMapCenter] = useState<[number, number]>([22.5, 75.0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-full w-full min-h-[480px] bg-slate-950 flex flex-col items-center justify-center text-slate-400 font-mono text-xs gap-2">
        <div className="h-6 w-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <span>Initializing DoLR Leaflet GIS Engine...</span>
      </div>
    );
  }

  const layers = activeLayers || {
    cadastral: true,
    landUse: true,
    infrastructure: true,
    socioEconomic: true,
    climateRisk: true,
    disputeHotspots: true,
    remoteSensingNDVI: true,
  };

  const tileUrls = {
    osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  };

  return (
    <div className="relative h-full w-full min-h-[480px]">
      
      {/* Map Tile & Control Floating Pill */}
      <div className="absolute top-3 right-3 z-[1000] bg-slate-900/90 backdrop-blur border border-slate-700 p-1.5 rounded-xl shadow-2xl flex items-center gap-1.5 text-xs">
        <button
          onClick={() => setBaseMapType("osm")}
          className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
            baseMapType === "osm" ? "bg-amber-500 text-slate-950 shadow" : "text-slate-300 hover:text-white"
          }`}
        >
          🗺️ Standard Map
        </button>
        <button
          onClick={() => setBaseMapType("satellite")}
          className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
            baseMapType === "satellite" ? "bg-cyan-500 text-slate-950 shadow" : "text-slate-300 hover:text-white"
          }`}
        >
          🛰️ Esri Satellite
        </button>
      </div>

      <MapContainer 
        center={mapCenter} 
        zoom={5} 
        style={{ height: "100%", width: "100%", minHeight: "480px", borderRadius: "0 0 0.75rem 0.75rem" }}
      >
        <MapController center={mapCenter} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | DoLR GIS'
          url={tileUrls[baseMapType]}
        />

        {/* Climate Risk Spatial Buffer Overlays */}
        {layers.climateRisk && (
          <FeatureGroup>
            {/* Kutch Salinity & Aridity Zone */}
            <Circle 
              center={[23.2420, 69.6669]} 
              pathOptions={{ fillColor: '#ef4444', color: '#b91c1c', fillOpacity: 0.35, weight: 2 }} 
              radius={85000}
            >
              <Popup>
                <div className="p-1 text-xs space-y-1">
                  <strong className="text-rose-700 block font-bold">Kutch High Climate Vulnerability Zone</strong>
                  <p className="text-slate-600">Drought Index: 92/100 • Soil Salinity: 7.2 dS/m</p>
                  <p className="text-[10px] text-slate-500">Action: Desalination & Halophyte Agro-Forestry Mandated</p>
                </div>
              </Popup>
            </Circle>

            {/* Bharuch Coastal Flood Buffer */}
            <Circle 
              center={[21.7051, 72.9959]} 
              pathOptions={{ fillColor: '#0284c7', color: '#0369a1', fillOpacity: 0.35, weight: 2 }} 
              radius={60000}
            >
              <Popup>
                <div className="p-1 text-xs space-y-1">
                  <strong className="text-blue-700 block font-bold">Bharuch Coastal Flood Inundation Buffer</strong>
                  <p className="text-slate-600">Monsoon Surge Inundation Risk: 88/100</p>
                  <p className="text-[10px] text-slate-500">Action: Mangrove Belt Restoration</p>
                </div>
              </Popup>
            </Circle>
          </FeatureGroup>
        )}

        {/* Cadastral Land Parcel Boundary Polygons */}
        {layers.cadastral && (
          <FeatureGroup>
            {/* Sanand Peri-Urban Cadastral Polygon Simulation */}
            <Polygon
              positions={[
                [22.9800, 72.3600],
                [23.0100, 72.3700],
                [23.0000, 72.4100],
                [22.9700, 72.3900],
              ]}
              pathOptions={{ fillColor: '#10b981', color: '#047857', fillOpacity: 0.4, weight: 2 }}
            >
              <Popup>
                <div className="p-1 text-xs space-y-1">
                  <strong className="text-emerald-800 font-bold block">Cadastral Boundary Survey #142-148 (Sanand)</strong>
                  <p className="text-slate-600">ULPIN: GJ-24-9988-142A • 14.2 Hectares</p>
                  <p className="text-emerald-700 font-semibold text-[11px]">Status: 100% Vectorized with Drone Orthophoto</p>
                </div>
              </Popup>
            </Polygon>
          </FeatureGroup>
        )}

        {/* Dispute Hotspot Markers */}
        {layers.disputeHotspots && (
          <FeatureGroup>
            <Circle 
              center={[18.5204, 73.8567]} 
              pathOptions={{ fillColor: '#f59e0b', color: '#d97706', fillOpacity: 0.4, weight: 2 }} 
              radius={40000}
            >
              <Popup>
                <div className="p-1 text-xs space-y-1">
                  <strong className="text-amber-800 font-bold block">Pune Rural Dispute Hotspot Cluster</strong>
                  <p className="text-slate-600">Active Cases: 36,200 • Resolution Rate: 89.0%</p>
                  <p className="text-[10px] text-slate-500">NGDDRS Biometric Verification Active</p>
                </div>
              </Popup>
            </Circle>
          </FeatureGroup>
        )}

        {/* Real Interactive Cadastral Markers */}
        {landParcels.map((parcel) => (
          <Marker 
            key={parcel.id} 
            position={[parcel.lat, parcel.lng]} 
            icon={parcel.type === "climate" ? icons.climate : parcel.type === "dispute" ? icons.dispute : icons.cadastral}
          >
            <Popup>
              <div className="p-1.5 text-xs font-sans space-y-2 max-w-xs">
                <div className="border-b border-slate-200 pb-1">
                  <span className="text-[10px] font-mono font-bold text-amber-600 uppercase block">ULPIN: {parcel.ulpin}</span>
                  <strong className="text-slate-900 text-xs leading-tight block mt-0.5">{parcel.name}</strong>
                </div>

                <div className="space-y-0.5 text-[11px] text-slate-600">
                  <p>📍 Location: <strong>{parcel.district}, {parcel.state}</strong></p>
                  <p>👤 Title Owner: <strong>{parcel.owner}</strong></p>
                  <p>📐 Area: <strong>{parcel.area}</strong></p>
                  <p>🌾 Land Use: <strong>{parcel.landUse}</strong></p>
                  <p>🌱 Resilience: <strong className="text-emerald-700">{parcel.climateScore}</strong></p>
                </div>

                <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[10px]">
                  <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    {parcel.disputeStatus}
                  </span>
                  <span className="text-blue-600 font-bold">DoLR Synced ✅</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
}
