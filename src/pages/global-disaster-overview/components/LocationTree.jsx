// src/pages/global-disaster-overview/components/LocationTree.jsx
import React, { useMemo, useState } from "react";

/**
 * Simple, static tree used by the dashboard.
 * - No dependency on alerts/CSV.
 * - onLocationSelect(node) is called when a city (leaf) is clicked.
 * - selectedLocation is used only to highlight the active row.
 *
 * You can extend the LOCATIONS structure below (add/remove regions/cities).
 */
const LOCATIONS = [
  {
    id: "uae",
    name: "United Arab Emirates",
    children: [
      { id: "dubai", name: "Dubai", lat: 25.2048, lon: 55.2708, severity: "critical" },
      { id: "abudhabi", name: "Abu Dhabi", lat: 24.4539, lon: 54.3773, severity: "high" },
    ],
  },
  {
    id: "saudi",
    name: "Saudi Arabia",
    children: [
      { id: "riyadh", name: "Riyadh", lat: 24.7136, lon: 46.6753, severity: "medium" },
      { id: "jeddah", name: "Jeddah", lat: 21.4858, lon: 39.1925, severity: "low" },
    ],
  },
  {
    id: "asia-pacific",
    name: "Asia Pacific",
    children: [
      { id: "manila", name: "Manila", lat: 14.5995, lon: 120.9842, severity: "high" },
      { id: "jakarta", name: "Jakarta", lat:  -6.2088, lon: 106.8456, severity: "medium" },
    ],
  },
  {
    id: "americas",
    name: "Americas",
    children: [
      {
        id: "united-states",
        name: "United States",
        children: [
          { id: "miami", name: "Miami", lat: 25.7617, lon: -80.1918, severity: "medium" },
          { id: "houston", name: "Houston", lat: 29.7604, lon: -95.3698, severity: "low" },
        ],
      },
    ],
  },
];

function Chevron({ open }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform ${open ? "rotate-90" : ""}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M6.293 7.293a1 1 0 011.414 0L12 11.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SeverityDot({ level = "low" }) {
  const color =
    level === "critical"
      ? "bg-red-500"
      : level === "high"
      ? "bg-orange-500"
      : level === "medium"
      ? "bg-yellow-500"
      : "bg-green-500";
  return <span className={`inline-block h-3 w-3 rounded-full ${color}`} />;
}

function Row({
  depth = 0,
  label,
  isFolder = false,
  open = false,
  onToggle,
  onClick,
  active = false,
  severity,
}) {
  return (
    <div
      className={`flex items-center justify-between w-full py-2 pr-2 pl-${Math.min(
        4 + depth * 4,
        16
      )} rounded cursor-pointer ${
        active ? "bg-slate-700/60 text-slate-100" : "hover:bg-slate-700/40 text-slate-200"
      }`}
      onClick={isFolder ? onToggle : onClick}
    >
      <div className="flex items-center gap-2">
        {isFolder ? (
          <Chevron open={open} />
        ) : (
          <SeverityDot level={severity} />
        )}
        <span className="text-sm">{label}</span>
      </div>
    </div>
  );
}

function TreeNode({ node, depth, expanded, setExpanded, onSelect, selected }) {
  const isFolder = Array.isArray(node.children) && node.children.length > 0;
  const open = expanded.has(node.id);

  const active =
    selected &&
    ((selected.name && node.name && selected.name.toLowerCase() === node.name.toLowerCase()) ||
      (selected.id && node.id && selected.id === node.id));

  return (
    <div className="w-full">
      <Row
        depth={depth}
        label={node.name}
        isFolder={isFolder}
        open={open}
        severity={node.severity}
        active={!!active}
        onToggle={() => {
          if (!isFolder) return;
          const next = new Set(expanded);
          if (next.has(node.id)) next.delete(node.id);
          else next.add(node.id);
          setExpanded(next);
        }}
        onClick={() => {
          if (isFolder) return;
          onSelect?.(node);
        }}
      />
      {isFolder && open && (
        <div className="mt-1">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              setExpanded={setExpanded}
              onSelect={onSelect}
              selected={selected}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function LocationTree({ onLocationSelect, selectedLocation }) {
  // Keep top-level groups open by default
  const defaultOpen = useMemo(() => new Set(LOCATIONS.map((g) => g.id)), []);
  const [expanded, setExpanded] = useState(defaultOpen);

  return (
    <div className="h-full bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-slate-200">Locations</h3>
        <p className="text-xs text-slate-400">Navigate global disaster zones</p>
      </div>

      <div className="p-2 overflow-y-auto h-[calc(100%-64px)] space-y-1">
        {LOCATIONS.map((group) => (
          <TreeNode
            key={group.id}
            node={group}
            depth={0}
            expanded={expanded}
            setExpanded={setExpanded}
            onSelect={onLocationSelect}
            selected={selectedLocation}
          />
        ))}
      </div>
    </div>
  );
}
