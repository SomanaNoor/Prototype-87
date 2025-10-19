import React, { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";

// Simple severity -> color
const sevColor = (s) =>
  ({ Critical: "#D32F2F", High: "#F57C00", Medium: "#FBC02D", Low: "#22C55E" }[s] || "#38BDF8");

// SVG dot marker
const makeIcon = (hex) =>
  L.divIcon({
    className: "leaflet-marker-dot",
    html: `
      <svg width="22" height="22" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="g" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="black" flood-opacity="0.6"/>
          </filter>
        </defs>
        <g filter="url(#g)">
          <circle cx="22" cy="22" r="8" fill="${hex}" />
          <circle cx="22" cy="22" r="13" fill="${hex}" opacity="0.28" />
        </g>
      </svg>
    `,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });

/**
 * Props
 * - alerts: [{ id, name, lat, lon, severity }]
 * - selected: { lat, lon, zoom? }  // zoom 2..18 (default 6)
 * - onLocationSelect(node|null)
 * - padding: {left, right, top, bottom}  // pixels used to avoid sidebar/header overlap
 */
export default function LeafletMapCanvas({
  alerts = [],
  selected = null,
  onLocationSelect,
  padding = { left: 260, right: 20, top: 64, bottom: 24 },
}) {
  // A wrapper so we can access the map instance and control it
  function MapLogic() {
    const map = useMap();
    const roRef = useRef(null);

    // --- Make sure Leaflet knows the real size of its container
    useEffect(() => {
      // On first paint and again shortly after layout settles
      map.invalidateSize();
      const t = setTimeout(() => map.invalidateSize(), 120);
      return () => clearTimeout(t);
    }, [map]);

    // Also track container resizes (e.g., sidebar collapse/expand)
    useEffect(() => {
      const el = map.getContainer();
      const ro = new ResizeObserver(() => map.invalidateSize());
      ro.observe(el);
      roRef.current = ro;
      return () => ro.disconnect();
    }, [map]);

    // Helper bounds padding (keeps focus away from sidebar/header/footer)
    const pad = useMemo(
      () => ({
        paddingTopLeft: L.point(padding.left, padding.top),
        paddingBottomRight: L.point(padding.right, padding.bottom),
      }),
      [padding.left, padding.right, padding.top, padding.bottom]
    );

    // Fit all alerts on load (if nothing selected)
    useEffect(() => {
      if (!alerts.length || selected) return;
      const b = L.latLngBounds(alerts.map((a) => [a.lat, a.lon]));
      if (b.isValid()) map.fitBounds(b, pad);
    }, [map, alerts, selected, pad]);

    // Pan/zoom when something is selected from the tree
    useEffect(() => {
      if (!selected) return;
      const z = Math.max(2, Math.min(18, selected.zoom ?? 6));
      // Use flyToBounds with a tiny bounds around the point to honor padding
      const tiny = L.latLngBounds(
        [selected.lat + 0.0001, selected.lon + 0.0001],
        [selected.lat - 0.0001, selected.lon - 0.0001]
      );
      map.flyToBounds(tiny, { ...pad, maxZoom: z, duration: 0.8 });
    }, [map, selected, pad]);

    // Recenter to fit alerts again when alerts change and nothing is selected
    useEffect(() => {
      if (!alerts.length || selected) return;
      const b = L.latLngBounds(alerts.map((a) => [a.lat, a.lon]));
      if (b.isValid()) map.fitBounds(b, pad);
    }, [map, alerts, selected, pad]);

    return null;
  }

  return (
    <MapContainer
      className="h-full min-h-[380px] w-full rounded-md overflow-hidden bg-[#0b1220]"
      center={[20, 0]}
      zoom={3}
      zoomControl={true}
      attributionControl={true}
      whenCreated={(m) => {
        // safety: ensure a valid size on creation
        requestAnimationFrame(() => m.invalidateSize());
      }}
      // clicking empty map clears selection
      onClick={() => onLocationSelect?.(null)}
    >
      {/* CARTO Dark Matter (free, no key) */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      {alerts.map((a) => (
        <Marker
          key={a.id}
          position={[a.lat, a.lon]}
          icon={makeIcon(sevColor(a.severity))}
          eventHandlers={{
            click: () => onLocationSelect?.(a),
          }}
          title={`${a.name ?? a.id} — Severity: ${a.severity ?? "N/A"}`}
        />
      ))}

      <MapLogic />
    </MapContainer>
  );
}