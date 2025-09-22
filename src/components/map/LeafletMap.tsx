"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { getDapilTotal } from "@/services/api/dapil";
import { Dapil } from "@/types/dapil";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const Polygon = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polygon),
  {
    ssr: false,
  }
);

const Tooltip = dynamic(
  () => import("react-leaflet").then((mod) => mod.Tooltip),
  {
    ssr: false,
  }
);

interface MapProps {
  className?: string;
}

export default function LeafletMap({ className }: MapProps) {
  const mapRef = useRef<any>(null);
  const [dapilLocations, setDapilLocations] = useState<Dapil>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDapilTotal();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const L = require("leaflet");

      // Define unique colors matching the reference image
      const dapilColors = {
        "1,2": "#ef4444",
        "5": "#ef4444",
        "4": "#ef4444",
        "6": "#ef4444",
        "3": "#ef4444",
      };

      // Create function to generate colored marker icon
      const createColoredIcon = (color: string) => {
        return L.divIcon({
          html: `
            <div style="position: relative;">
              <div style="width: 12px; height: 12px; background-color: ${color}; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>
              <div style="position: absolute; top: 12px; left: 50%; transform: translateX(-50%); width: 2px; height: 16px; background-color: ${color};"></div>
            </div>
          `,
          className: "custom-marker",
          iconSize: [16, 32],
          iconAnchor: [8, 32],
        });
      };

      // Store the color mapping and icon creator globally
      (window as any).dapilColors = dapilColors;
      (window as any).createColoredIcon = createColoredIcon;
    }
  }, []);

  // PALI region center coordinates (more accurate for Kabupaten PALI)
  const paliCenter = [-2.995, 104.238];

  // Define realistic geographical boundaries for each Dapil area based on reference image
  const dapilPolygons = {
    "1,2": {
      coordinates: [
        [-3.45, 103.65],
        [-3.45, 104.05],
        [-3.25, 104.15],
        [-3.05, 104.25],
        [-2.95, 104.35],
        [-2.85, 104.25],
        [-2.75, 104.05],
        [-2.85, 103.85],
        [-3.05, 103.75],
        [-3.25, 103.65],
        [-3.45, 103.65],
      ],
      color: "#d62828",
      name: "Talang Ubi A & Talang Ubi B",
      total: 15,
    },
    "5": {
      coordinates: [
        [-2.65, 104.25],
        [-2.65, 104.55],
        [-2.55, 104.65],
        [-2.45, 104.55],
        [-2.55, 104.35],
        [-2.65, 104.25],
      ],
      color: "#fbbf24",
      labelColor: "#d62828",
      name: "Abab",
      total: 5,
    },
    "4": {
      coordinates: [
        [-2.75, 104.05],
        [-2.75, 104.35],
        [-2.65, 104.45],
        [-2.55, 104.35],
        [-2.65, 104.15],
        [-2.75, 104.05],
      ],
      color: "#fb923c",
      labelColor: "#d62828",
      name: "Penukal",
      total: 6,
    },
    "6": {
      coordinates: [
        [-3.05, 104.25],
        [-3.05, 104.55],
        [-2.85, 104.65],
        [-2.75, 104.55],
        [-2.85, 104.35],
        [-2.95, 104.25],
        [-3.05, 104.25],
      ],
      color: "#3b82f6",
      labelColor: "#d62828",
      name: "Tanah Abang",
      total: 6,
    },
    "3": {
      coordinates: [
        [-2.85, 103.85],
        [-2.85, 104.25],
        [-2.65, 104.35],
        [-2.55, 104.25],
        [-2.65, 104.05],
        [-2.75, 103.95],
        [-2.85, 103.85],
      ],
      color: "#86efac",
      labelColor: "#d62828",
      name: "Penukal Utara",
      total: 3,
    },
  };

  const fetchDapilTotal = () => {
    setIsLoading(true);
    getDapilTotal()
      .then((res: any) => {
        console.log("Dapil API Response:", res);
        // Wrap the array in an items property to match the Dapil type
        setDapilLocations({ items: res.data });
        setIsLoading(false);
      })
      .catch((err: any) => {
        console.log("Check Error", err);
        setIsLoading(false);
        // Fallback data with same structure
        setDapilLocations({
          items: [
            {
              id: "1",
              name: "Dapil 1",
              nama: "Dapil 1",
              position: [-3.15, 104.18],
              kecamatan: ["Kec 1", "Kec 2"],
            },
            {
              id: "2",
              name: "Dapil 2",
              nama: "Dapil 2",
              position: [-2.85, 104.35],
              kecamatan: ["Kec 3", "Kec 4"],
            },
          ],
        });
      });
  };

  return (
    <div className={className}>
      <MapContainer
        center={paliCenter as [number, number]}
        zoom={9}
        scrollWheelZoom={true}
        className="h-full w-full rounded-lg"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Render colored polygon areas for each Dapil */}
        {Object.entries(dapilPolygons).map(([id, polygon]) => (
          <Polygon
            key={id}
            positions={polygon.coordinates as [number, number][]}
            pathOptions={{
              fillColor: polygon.color,
              fillOpacity: 0.6,
              color: polygon.color,
              weight: 2,
              opacity: 0.9,
            }}
          >
            <Tooltip permanent direction="center" className="dapil-label">
              <div className="text-center">
                <div
                  className="text-white px-2 py-1 rounded-t text-xs font-bold"
                  style={{
                    backgroundColor: (polygon as any).labelColor || polygon.color,
                  }}
                >
                  {polygon.name}
                </div>
                <div
                  className="text-white px-2 py-1 rounded-b text-xs font-semibold"
                  style={{ backgroundColor: "white", color: "#374151" }}
                >
                  {polygon.total} Orang
                </div>
              </div>
            </Tooltip>
            <Popup>
              <div className="text-center">
                <div
                  className="text-white px-3 py-2 rounded text-sm font-bold mb-2"
                  style={{
                    backgroundColor: (polygon as any).labelColor || polygon.color,
                  }}
                >
                  {polygon.name}
                </div>
                <div className="bg-white border border-gray-200 px-3 py-2 rounded text-center">
                  <div className="text-gray-700 font-semibold text-sm">
                    {polygon.total} Orang
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  Wilayah Dapil - DPRD PALI
                </div>
              </div>
            </Popup>
          </Polygon>
        ))}

        {dapilLocations?.items
          ?.map((item, idx) => {
            console.log(`Rendering marker ${idx}:`, item);

            // Ensure position is valid
            const position =
              Array.isArray(item.position) && item.position.length === 2
                ? (item.position as [number, number])
                : null;

            if (!position) {
              console.log(`Invalid position for ${item.nama}:`, item.position);
              return null;
            }

            // Get color for this Dapil
            const dapilColors = (window as any).dapilColors || {};
            const color = dapilColors[item.id] || "#dc2626"; // Default to red if no color found
            const coloredIcon = (window as any).createColoredIcon?.(color);

            return (
              <Marker key={item.id} position={position} icon={coloredIcon}>
                <Popup className="custom-popup">
                  <div className="p-2">
                    <div
                      className="text-white px-3 py-1 rounded text-sm font-bold text-center mb-2"
                      style={{ backgroundColor: color }}
                    >
                      {item.nama}
                    </div>
                    <div className="bg-white border border-gray-200 px-3 py-2 rounded text-center">
                      <div className="text-gray-700 font-semibold text-sm">
                        {item.kecamatan?.length || 0} Anggota
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-600">
                      Wilayah {item.nama || item.name} - DPRD PALI
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })
          .filter(Boolean)}
      </MapContainer>

      <style jsx global>{`
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }

        .custom-popup .leaflet-popup-content-wrapper {
          background: transparent;
          box-shadow: none;
          border: none;
          border-radius: 8px;
        }

        .custom-popup .leaflet-popup-content {
          margin: 0;
          padding: 0;
        }

        .custom-popup .leaflet-popup-tip {
          background: white;
          border: 1px solid #ddd;
        }

        .leaflet-container {
          font-family: inherit;
        }

        .dapil-label .leaflet-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        .dapil-label .leaflet-tooltip-top:before {
          display: none !important;
        }

        .leaflet-tooltip {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
}
