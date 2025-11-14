"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const API_KEY = process.env.NEXT_PUBLIC_GEOPIFY_kEY;

console.log(API_KEY);


export default function SmoothAgentMap() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  const [agents, setAgents] = useState([
    { id: 1, name: "Agent 1", lat: 25.2048, lon: 55.2708, img: "https://backend.mytime2cloud.com/media/employee/profile_picture/1763124922.jpg" },
    { id: 2, name: "Agent 2", lat: 25.276987, lon: 55.296249, img: "https://backend.mytime2cloud.com/media/employee/profile_picture/1763124922.jpg" },
    { id: 3, name: "Agent 3", lat: 25.1972, lon: 55.2744, img: "https://backend.mytime2cloud.com/media/employee/profile_picture/1763124922.jpg" },
    { id: 4, name: "Agent 4", lat: 25.2221, lon: 55.3190, img: "https://backend.mytime2cloud.com/media/employee/profile_picture/1763124922.jpg" },
    { id: 5, name: "Agent 5", lat: 25.2532, lon: 55.2920, img: "https://backend.mytime2cloud.com/media/employee/profile_picture/1763124922.jpg" },
  ]);

  const markers = useRef({});

  // Initialize map and markers
  useEffect(() => {
    if (!mapContainer.current) return;

    if (!mapRef.current) {
      mapRef.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://maps.geoapify.com/v1/styles/osm-bright/style.json?apiKey=${API_KEY}`,
        center: [55.2708, 25.2048],
        zoom: 11,
      });

      mapRef.current.addControl(new maplibregl.NavigationControl(), "top-right");

      // Add agent markers using image URLs
      agents.forEach((agent) => {
        const el = document.createElement("div");
        el.style.width = "40px";
        el.style.height = "40px";
        el.style.borderRadius = "50%";
        el.style.overflow = "hidden";
        el.style.border = "2px solid #fff";
        el.style.boxShadow = "0 0 4px rgba(0,0,0,0.5)";

        const img = document.createElement("img");
        img.src = agent.img;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";

        el.appendChild(img);

        const marker = new maplibregl.Marker(el)
          .setLngLat([agent.lon, agent.lat])
          .setPopup(new maplibregl.Popup().setHTML(`<b>${agent.name}</b>`))
          .addTo(mapRef.current);

        markers.current[agent.id] = { marker, target: { lat: agent.lat, lon: agent.lon } };
      });
    }
  }, []);

  // Smooth animation loop
  useEffect(() => {
    let animationFrame;
    const animateMarkers = () => {
      Object.values(markers.current).forEach(({ marker, target }) => {
        const current = marker.getLngLat();
        const step = 0.001;

        const newLng =
          Math.abs(current.lng - target.lon) < step
            ? target.lon
            : current.lng + Math.sign(target.lon - current.lng) * step;
        const newLat =
          Math.abs(current.lat - target.lat) < step
            ? target.lat
            : current.lat + Math.sign(target.lat - current.lat) * step;

        marker.setLngLat([newLng, newLat]);
      });

      animationFrame = requestAnimationFrame(animateMarkers);
    };

    animationFrame = requestAnimationFrame(animateMarkers);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Update target positions every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents((prev) =>
        prev.map((a) => ({
          ...a,
          lat: a.lat + (Math.random() - 0.5) * 0.01,
          lon: a.lon + (Math.random() - 0.5) * 0.01,
        }))
      );

      // Update marker targets
      setAgents((prev) => {
        prev.forEach((agent) => {
          if (markers.current[agent.id]) {
            markers.current[agent.id].target = { lat: agent.lat, lon: agent.lon };
          }
        });
        return prev;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Smooth Agent Tracker</h2>
      <div ref={mapContainer} style={{ width: "100%", height: "600px" }}></div>
    </div>
  );
}
