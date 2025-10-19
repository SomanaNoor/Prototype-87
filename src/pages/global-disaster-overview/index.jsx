// src/pages/global-disaster-overview/index.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/ui/Header";
import MetricCard from "./components/MetricCard";
import LocationTree from "./components/LocationTree";
import LiveAlertFeed from "./components/LiveAlertFeed";
import LeafletMapCanvas from "@/components/map/LeafletMapCanvas";

const GlobalDisasterOverview = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage") || "en";
    setCurrentLanguage(saved);
  }, []);

  /*// Demo alerts shown on the map (replace with CSV-backed data later)
  const alerts = useMemo(
    () => [
      {
        id: "Dubai",
        name: "Dubai",
        lat: 25.2048,
        lon: 55.2708,
        severity: "Critical",
        displaced: 520,
        confidence: 0.9,
      },
      {
        id: "AbuDhabi",
        name: "Abu Dhabi",
        lat: 24.4539,
        lon: 54.3773,
        severity: "High",
        displaced: 260,
        confidence: 0.85,
      },
      {
        id: "Riyadh",
        name: "Riyadh",
        lat: 24.7136,
        lon: 46.6753,
        severity: "Medium",
        displaced: 220,
        confidence: 0.78,
      },
    ],
    []
  );*/

  // Load alerts from CSV in /public/data/alerts.csv
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/alerts.csv`)
      .then((res) => res.text())
      .then((text) => {
        const rows = text.trim().split("\n").slice(1); // skip header
        const parsed = rows.map((line) => {
          const [id, name, lat, lon, severity, displaced, confidence] = line.split(",");
          return {
            id,
            name,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            severity,
            displaced: Number(displaced),
            confidence: Number(confidence),
          };
        });
        setAlerts(parsed);
      })
      .catch((err) => console.error("Error loading CSV:", err));
  }, []);

  // Normalize selections from the sidebar into { lat, lon, zoom }
  const handleLocationSelect = (node) => {
    if (!node) return setSelectedLocation(null);

    let sel = null;
    if (node?.lat != null && node?.lon != null) {
      sel = { lat: node.lat, lon: node.lon, zoom: 8, name: node.name || node.title };
    } else if (Array.isArray(node?.coordinates) && node.coordinates.length >= 2) {
      sel = { lon: node.coordinates[0], lat: node.coordinates[1], zoom: 8, name: node.name || node.title };
    } else if (node?.name) {
      const hit = alerts.find((a) => (a.name || a.id).toLowerCase() === node.name.toLowerCase());
      if (hit) sel = { lat: hit.lat, lon: hit.lon, zoom: 8, name: hit.name || hit.id };
    }

    setSelectedLocation(sel);
  };

  // ✅ UPDATED METRICS
  const metricsData = [
    { title: "Active Disasters", value: 47, unit: "events", change: "+3", changeType: "increase", icon: "AlertTriangle", severity: "critical", confidence: 94 },
    { title: "Affected Population", value: 200_000_000, unit: "people", change: "+12%", changeType: "increase", icon: "Users", severity: "high", confidence: 87 },
    { title: "Infrastructure at Risk", value: 5_000, unit: "assets", change: "+8%", changeType: "increase", icon: "Building2", severity: "high", confidence: 91 },
    { title: "Displacement Estimates", value: 30_000_000, unit: "displaced", change: "+15%", changeType: "increase", icon: "MapPin", severity: "critical", confidence: 82 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Global Disaster Overview - CIF-AI Dashboard</title>
        <meta name="description" content="Real-time global disaster monitoring and cascading impact analysis" />
      </Helmet>

      <Header />

      <main className="pt-16">
        {/* Metrics header */}
        <div className="px-6 py-6 border-b border-border">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">Global Disaster Overview</h1>
            <p className="text-muted-foreground">
              Real-time monitoring of climate disasters and cascading impacts worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metricsData.map((m, i) => (
              <MetricCard key={i} {...m} />
            ))}
          </div>
        </div>

        {/* Main grid: 4 (sidebar) / 16 (map) / 4 (alerts) = 24 */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-24 gap-6">
            {/* Sidebar: Locations */}
            <div className="col-span-24 lg:col-span-4">
              <LocationTree
                onLocationSelect={handleLocationSelect}
                selectedLocation={selectedLocation}
              />
            </div>

            {/* WIDER MAP */}
            <div className="col-span-24 lg:col-span-16">
              <div className="bg-slate-800 border border-slate-700 rounded-lg h-[calc(100vh-280px)] overflow-hidden">
                <div className="p-4 border-b border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-200">Interactive Disaster Map</h2>
                      <p className="text-xs text-slate-400">Open-source basemap via OSM/CARTO (no billing)</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs text-slate-300">Live Updates</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map canvas */}
                <div className="h-[calc(100%-64px)]">
                  <LeafletMapCanvas
                    alerts={alerts}
                    selected={selectedLocation}
                    onLocationSelect={(a) =>
                      setSelectedLocation(a ? { lat: a.lat, lon: a.lon, zoom: 9, name: a.name || a.id } : null)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Alerts list aligned to the far right */}
            <div className="col-span-24 lg:col-span-4">
              <LiveAlertFeed />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GlobalDisasterOverview;