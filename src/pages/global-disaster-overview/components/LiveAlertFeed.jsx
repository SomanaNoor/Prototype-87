// src/pages/global-disaster-overview/components/LiveAlertFeed.jsx
import React from "react";
import Icon from "@/components/AppIcon";

/**
 * Accepts an optional `alerts` prop. If not given, uses defaults.
 * Each alert item:
 *  {
 *    title: string,
 *    location: string,
 *    description: string,
 *    affected: string,      // e.g., "0.8M affected"
 *    confidence: string,    // e.g., "87%"
 *    time: string           // e.g., "16m ago"
 *  }
 */
export default function LiveAlertFeed({ alerts }) {
  const fallback = [
    {
      title: "Magnitude 7.2 Earthquake",
      location: "Manila, Philippines",
      description:
        "Major seismic activity detected with potential for significant infrastructure damage and population displacement.",
      affected: "2.4M affected",
      confidence: "94%",
      time: "6m ago",
    },
    {
      title: "Extreme Heat Wave Alert",
      location: "Dubai, UAE",
      description:
        "Record-breaking temperatures exceeding 48°C observed. Public health advisory issued to minimize outdoor exposure.",
      affected: "0.8M affected",
      confidence: "87%",
      time: "16m ago",
    },
    {
      title: "Category 4 Cyclone Approaching",
      location: "Cebu, Philippines",
      description:
        "Tropical cyclone with sustained winds of 240 km/h expected to make landfall within 6 hours.",
      affected: "1.2M affected",
      confidence: "91%",
      time: "31m ago",
    },
    {
      title: "Severe Drought Conditions",
      location: "Riyadh, Saudi Arabia",
      description:
        "Prolonged dry spell affecting agriculture and groundwater reserves. Critical water shortage reported.",
      affected: "0.5M affected",
      confidence: "82%",
      time: "46m ago",
    },
    {
      title: "Flood Risk Advisory",
      location: "Jakarta, Indonesia",
      description:
        "Urban drainage systems at capacity following sustained rainfall. Evacuation readiness recommended.",
      affected: "3.2M affected",
      confidence: "78%",
      time: "1h ago",
    },
  ];

  const items = Array.isArray(alerts) && alerts.length ? alerts : fallback;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg h-[calc(100vh-280px)] overflow-hidden">
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-200">Live Alerts</h3>
          <p className="text-xs text-slate-400">Newest first · auto-refresh</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Live
          </span>
        </div>
      </div>

      <div className="p-3 overflow-y-auto h-[calc(100%-64px)] space-y-3">
        {items.map((a, idx) => (
          <div
            key={idx}
            className="rounded-md border border-white/10 bg-slate-700/40 p-3 hover:bg-slate-700/60 transition"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <Icon name="AlertTriangle" size={16} color="#F59E0B" />
                  <h4 className="text-sm font-semibold text-slate-100">{a.title}</h4>
                </div>
                <div className="text-xs text-slate-300 mt-1">{a.location}</div>
                <p className="text-xs text-slate-200/90 mt-2 leading-relaxed">{a.description}</p>
                <div className="flex flex-wrap items-center gap-3 mt-3 text-[11px] text-slate-200/80">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900/40 border border-white/10">
                    <Icon name="Users" size={12} color="#E5E7EB" />
                    {a.affected}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900/40 border border-white/10">
                    <Icon name="BarChart3" size={12} color="#E5E7EB" />
                    Confidence {a.confidence}
                  </span>
                </div>
              </div>

              <div className="shrink-0 text-[11px] text-slate-400">{a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}