import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useProperties } from '../context/PropertyContext';
import AddPropertyModal from '../components/AddPropertyModal';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties, deleteProperty } = useProperties();

  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="min-h-screen bg-[var(--color-washi)] text-[var(--color-sumi)] flex flex-col">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto px-4 py-16 text-center">
          <span className="text-4xl font-light text-stone-400 block mb-3">無</span>
          <h1 className="text-xl font-light tracking-widest uppercase text-[var(--color-sumi)] mb-2">
            Property Not Found
          </h1>
          <p className="text-xs text-[var(--color-mist)] mb-6">
            The requested real estate listing could not be located or has been removed.
          </p>
          <Link
            to="/"
            className="px-5 py-2.5 text-xs uppercase tracking-widest bg-[var(--color-sumi)] text-[var(--color-washi)] hover:bg-[var(--color-take)] transition-colors inline-block"
          >
            Return to Dashboard
          </Link>
        </main>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${property.title}"?`)) {
      deleteProperty(property.id);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-washi)] text-[var(--color-sumi)] flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-8 py-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-xs uppercase tracking-widest text-[var(--color-mist)] hover:text-[var(--color-sumi)] transition-colors inline-flex items-center gap-2"
          >
            <span>←</span>
            <span>Back to Dashboard</span>
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            className="text-xs uppercase tracking-widest text-red-600 hover:text-red-700 transition-colors"
          >
            Delete Listing
          </button>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full bg-stone-200 overflow-hidden border border-stone-300">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-mono tracking-widest uppercase bg-[var(--color-sumi)] text-[var(--color-washi)]">
              {property.code}
            </span>
            <span className="px-3 py-1 text-xs tracking-widest uppercase bg-white/95 text-[var(--color-sumi)] border border-stone-300">
              {property.type}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="bg-white border border-stone-300/80 p-6 sm:p-10 space-y-8">
          
          {/* Header */}
          <div className="flex items-baseline justify-between gap-4 flex-wrap pb-6 border-b border-stone-200">
            <div>
              <h1 className="text-2xl sm:text-3xl font-light tracking-wide text-[var(--color-sumi)]">
                {property.title}
              </h1>
              <p className="text-xs text-[var(--color-mist)] tracking-wide mt-1">
                {property.subtitle}
              </p>
            </div>
            <span className="text-2xl font-light text-stone-400">
              {property.japaneseTitle}
            </span>
          </div>

          {/* Pricing & Status */}
          <div className="p-4 bg-[#FAF8F5] border border-stone-200 flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-mist)] block">
                Acquisition Price / 取得価格
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-semibold text-[var(--color-sumi)]">
                  {property.priceFormatted}
                </span>
                <span className="text-xs text-[var(--color-mist)]">
                  approx. {property.approxUsd}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-mist)] block mb-1">
                Contract Status
              </span>
              <span className="inline-block px-3 py-1 text-xs uppercase tracking-widest font-medium border border-stone-300 bg-white text-[var(--color-sumi)]">
                {property.status}
              </span>
            </div>
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-4 border border-stone-200">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-mist)] block">
                Floor Area
              </span>
              <span className="text-lg font-medium text-[var(--color-sumi)] mt-0.5 block">
                {property.area} m²
              </span>
              <span className="text-[10px] text-stone-400">{property.tatami}</span>
            </div>
            <div className="p-4 border border-stone-200">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-mist)] block">
                Layout
              </span>
              <span className="text-lg font-medium text-[var(--color-sumi)] mt-0.5 block">
                {property.rooms}
              </span>
              <span className="text-[10px] text-stone-400">Rooms</span>
            </div>
            <div className="p-4 border border-stone-200">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-mist)] block">
                Constructed
              </span>
              <span className="text-lg font-medium text-[var(--color-sumi)] mt-0.5 block">
                {property.yearBuilt}
              </span>
              <span className="text-[10px] text-stone-400">Year Built</span>
            </div>
            <div className="p-4 border border-stone-200">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-mist)] block">
                Location
              </span>
              <span className="text-sm font-medium text-[var(--color-sumi)] mt-1 block truncate">
                {property.location}
              </span>
              <span className="text-[10px] text-stone-400">Prefecture</span>
            </div>
          </div>

          {/* Narrative */}
          <div className="space-y-2">
            <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--color-mist)] font-medium">
              Architectural Narrative & Spatial Philosophy (間)
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed font-light">
              {property.description}
            </p>
          </div>

          {/* Features */}
          {property.features && property.features.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--color-mist)] font-medium">
                Craftsmanship & Key Amenities
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {property.features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-xs text-stone-600 bg-[#FAF8F5] px-3 py-2 border border-stone-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-take)]"></span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Agent */}
          <div className="pt-6 border-t border-stone-200 flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[var(--color-mist)] block">
                Listing Advisor
              </span>
              <span className="text-sm font-medium text-[var(--color-sumi)]">
                {property.agent || 'Kenjiro Sato'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => alert(`Viewing request recorded for ${property.code}`)}
              className="px-6 py-2.5 text-xs uppercase tracking-widest bg-[var(--color-sumi)] text-[var(--color-washi)] hover:bg-[var(--color-take)] transition-colors cursor-pointer"
            >
              Request Private Showing
            </button>
          </div>

        </div>
      </main>

      <AddPropertyModal />
    </div>
  );
}
