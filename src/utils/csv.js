// Minimal CSV loader (no extra deps). Put CSV under /public/data/...
export async function loadCSV(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url} (${res.status})`);
  const text = await res.text();
  const [headerLine, ...lines] = text.trim().split(/\r?\n/);
  const headers = headerLine.split(",");

  return lines
    .filter(Boolean)
    .map((line) => {
      const values = splitCSV(line);
      const row = {};
      headers.forEach((h, i) => (row[h] = coerce(values[i])));
      return row;
    });
}

// handle commas & quotes "a,b","c"
function splitCSV(line) {
  const out = [];
  let cur = "", inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQuotes) {
      if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; continue; }
      if (c === '"') { inQuotes = false; continue; }
      cur += c; continue;
    }
    if (c === '"') { inQuotes = true; continue; }
    if (c === ",") { out.push(cur); cur = ""; continue; }
    cur += c;
  }
  out.push(cur);
  return out;
}

function coerce(v) {
  if (v == null) return v;
  const s = String(v).trim();
  if (s === "") return "";
  if (s === "true") return true;
  if (s === "false") return false;
  if (!isNaN(+s)) return +s;
  return s;
}