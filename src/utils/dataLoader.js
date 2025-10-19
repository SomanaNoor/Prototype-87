// src/utils/dataLoader.js
import Papa from "papaparse";

const fetchCSV = (url) =>
  new Promise((resolve, reject) => {
    Papa.parse(url, { header: true, download: true, dynamicTyping: true, skipEmptyLines: true,
      complete: ({ data }) => resolve(data), error: reject });
  });

export async function loadAllData() {
  const [cities, nodes, edges] = await Promise.all([
    fetchCSV("/data/hotspots_cities_dataset.csv"),
    fetchCSV("/data/hotspots_infrastructure_nodes.csv"),
    fetchCSV("/data/hotspots_infrastructure_edges.csv"),
  ]);

  const citiesById = new Map(cities.map((c) => [c.city_id, c]));
  const nodesByCity = new Map();
  const edgesByCity = new Map();

  nodes.forEach((n) => {
    if (!nodesByCity.has(n.city_id)) nodesByCity.set(n.city_id, []);
    nodesByCity.get(n.city_id).push(n);
  });
  edges.forEach((e) => {
    if (!edgesByCity.has(e.city_id)) edgesByCity.set(e.city_id, []);
    edgesByCity.get(e.city_id).push(e);
  });

  const alerts = cities.map((c) => ({
    id: c.city_id,
    name: `${c.city}, ${c.country}`,
    lat: c.lat, lon: c.lon,
    severity: c.severity,
    displaced: c.displaced_est,
    confidence: c.confidence,
    hazard: c.hazard_type,
  }));

  return { cities, citiesById, nodes, nodesByCity, edges, edgesByCity, alerts };
}