import { MapPin } from 'lucide-react';
import type { Location } from '@/data/locations';
import { locations } from '@/data/locations';

interface AreasGridProps {
  /** The current location being viewed */
  location: Location;
  /** If provided, sub-areas link to service x location pages for this service slug */
  serviceSlug?: string;
  /** Title override */
  title?: string;
}

/**
 * Displays sub-locations as a non-clickable grid.
 */
export function AreasGrid({ location, serviceSlug, title }: AreasGridProps) {
  const heading = title || `Areas Near ${location.name} We Cover`;

  // Also show sibling major locations (excluding current)
  const siblingLocations = locations.filter(l => l.id !== location.id).slice(0, 4);

  return (
    <section className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
      <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">{heading}</h2>
      <p className="text-sm text-gray-500 mb-6">
        {serviceSlug
          ? `We connect homeowners across ${location.name} with trusted local professionals.`
          : `Explore garden room services in ${location.name} and surrounding areas.`
        }
      </p>

      {/* Sub-locations as static grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
        {location.subLocations.map((sub) => (
          <div
            key={sub.slug}
            className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-100"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
            <span className="text-sm font-medium text-gray-700">{sub.name}</span>
          </div>
        ))}
      </div>

      {/* Sibling major locations */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Other London Areas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {siblingLocations.map(loc => (
            <div
              key={loc.id}
              className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-100"
            >
              <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700">{loc.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
