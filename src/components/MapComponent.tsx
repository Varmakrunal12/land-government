"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle, FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function MapComponent({ activeLayers }: { activeLayers?: Record<string, boolean> }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const layers = activeLayers || { climateRisk: true, cadastral: true, disputeHotspots: true };

  const position: [number, number] = [21.1458, 79.0882];

  return (
    <MapContainer center={position} zoom={5} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {(layers.climateRisk || layers.climate) && (
        <FeatureGroup>
          <Circle center={[28.6139, 77.2090]} pathOptions={{ fillColor: 'red', color: 'red', fillOpacity: 0.4 }} radius={150000}>
            <Popup>High Climate Salinity & Vulnerability Zone (NCR Delhi & Coastal Belt)</Popup>
          </Circle>
          <Circle center={[19.0760, 72.8777]} pathOptions={{ fillColor: 'orange', color: 'orange', fillOpacity: 0.4 }} radius={100000}>
            <Popup>Moderate Salinity Risk (Konkan Coast)</Popup>
          </Circle>
        </FeatureGroup>
      )}

      {(layers.socioEconomic || layers.groundwater) && (
        <FeatureGroup>
          <Circle center={[31.1471, 75.3412]} pathOptions={{ fillColor: 'blue', color: 'darkblue', fillOpacity: 0.4 }} radius={180000}>
            <Popup>Severe Groundwater Depletion & High Population Density (Punjab)</Popup>
          </Circle>
          <Circle center={[26.9124, 75.7873]} pathOptions={{ fillColor: 'cyan', color: 'blue', fillOpacity: 0.4 }} radius={120000}>
            <Popup>Agri-Zoning Buffer Zone (Rajasthan)</Popup>
          </Circle>
        </FeatureGroup>
      )}
      
      {(layers.disputeHotspots || layers.disputed) && (
        <>
          <Marker position={[22.5726, 88.3639]} icon={icon}>
            <Popup>Disputed Cadastral Parcel #441A (Kolkata)</Popup>
          </Marker>
          <Marker position={[13.0827, 80.2707]} icon={icon}>
            <Popup>Disputed Cadastral Parcel #912B (Chennai)</Popup>
          </Marker>
          <Marker position={[17.3850, 78.4867]} icon={icon}>
            <Popup>Disputed Cadastral Parcel #110C (Hyderabad)</Popup>
          </Marker>
        </>
      )}
    </MapContainer>
  );
}
