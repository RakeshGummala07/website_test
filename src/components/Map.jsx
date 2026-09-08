import { MapPin, ExternalLink } from "lucide-react";
import { OFFICE_LOCATION } from "../config/company";

/**
 * Renders an interactive map for OFFICE_LOCATION (see src/config/company.js).
 * Uses an OpenStreetMap embed, which needs no API key. Once a confirmed
 * office address exists, update OFFICE_LOCATION's latitude/longitude only —
 * this component does not need to change.
 */
export default function Map() {
  const { latitude, longitude, city, state, country } = OFFICE_LOCATION;
  const delta = 0.06;
  const bbox = `${longitude - delta}%2C${latitude - delta}%2C${longitude + delta}%2C${latitude + delta}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude}%2C${longitude}`;
  const externalUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=12/${latitude}/${longitude}`;

  return (
    <div className="relative overflow-hidden rounded-xl2 border border-white/[0.08] bg-base-900">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full panel px-3.5 py-2 text-xs text-ink-300">
        <MapPin size={14} className="text-magenta-400" />
        {city}, {state}, {country}
      </div>
      <a
        href={externalUrl}
        target="_blank"
        rel="noreferrer"
        className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full panel px-3.5 py-2 text-xs text-ink-300 hover:text-ink-100 transition-colors"
      >
        Open map
        <ExternalLink size={13} />
      </a>
      <div className="opacity-[0.9] grayscale-[0.15] contrast-[1.05]">
        <iframe
          title="Jayanth Technologies office location"
          src={src}
          className="w-full h-[360px] md:h-[420px] border-0"
          loading="lazy"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06] rounded-xl2" />
    </div>
  );
}
