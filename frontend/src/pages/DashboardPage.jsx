import { useState } from 'react';
import Header from '../components/Header';
import PropertyTable from '../components/PropertyTable';
import PropertyCard from '../components/PropertyCard';
import PropertyDetailModal from '../components/PropertyDetailModal';
import AddPropertyModal from '../components/AddPropertyModal';
import { useProperties } from '../context/PropertyContext';

export default function DashboardPage() {
  const {
    properties,
    filteredProperties,
    propertyTypes,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    setIsAddModalOpen,
    resetDefaults,
    toastMessage
  } = useProperties();

  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'

  // Portfolio metrics
  const totalCount = properties.length;
  const availableCount = properties.filter((p) => p.status === 'Available').length;
  const totalValuation = properties.reduce((acc, p) => acc + (p.price || 0), 0);
  const avgValuation = totalCount > 0 ? Math.round(totalValuation / totalCount) : 0;

  return (
    <div className="min-h-screen bg-[var(--color-washi)] text-[var(--color-sumi)] flex flex-col">
      {/* Site Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-10 space-y-8">
        
        {/* Serene Intro Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-300/70">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--color-take)] font-medium">
                Portfolio Inventory • 物件台帳
              </span>
              <span className="text-stone-400 text-xs">•</span>
              <span className="text-[10px] tracking-[0.15em] text-[var(--color-mist)]">
                Lab 1: Table Management & Cards
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-light tracking-wide text-[var(--color-sumi)]">
              Real Estate Asset Management
            </h1>
            <p className="text-xs text-[var(--color-mist)] mt-1 font-light tracking-wider max-w-xl">
              Curated collection of Taisho-era machiya, contemporary forest villas, and minimalist residences adhering to the wabi-sabi philosophy.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={resetDefaults}
              className="px-3.5 py-2 text-xs tracking-wider uppercase border border-stone-300 text-[var(--color-mist)] hover:text-[var(--color-sumi)] hover:border-[var(--color-sumi)] transition-colors cursor-pointer"
              title="Restore initial 6 mock properties"
            >
              ↺ Reset Data
            </button>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2 text-xs tracking-[0.15em] uppercase bg-[var(--color-sumi)] text-[var(--color-washi)] hover:bg-[var(--color-take)] transition-colors cursor-pointer"
            >
              + New Property
            </button>
          </div>
        </div>

        {/* Portfolio Stats Row */}
        <section aria-label="Portfolio Metrics" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 sm:p-5 bg-white border border-stone-300/70 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-mist)] block">
              Total Assets
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-light text-[var(--color-sumi)]">
                {totalCount}
              </span>
              <span className="text-[10px] text-stone-400">listed</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 bg-white border border-stone-300/70 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-mist)] block">
              Available For Contract
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-light text-[var(--color-take)]">
                {availableCount}
              </span>
              <span className="text-[10px] text-stone-400">of {totalCount} active</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 bg-white border border-stone-300/70 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-mist)] block">
              Total Portfolio Valuation
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-lg sm:text-xl font-medium tracking-tight text-[var(--color-sumi)] truncate">
                ¥{(totalValuation / 1000000).toFixed(1)}M
              </span>
              <span className="text-[10px] text-stone-400 truncate">
                approx ${(totalValuation / 150000000).toFixed(2)}M
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-5 bg-white border border-stone-300/70 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-mist)] block">
              Average Asset Value
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-lg sm:text-xl font-medium tracking-tight text-[var(--color-sumi)] truncate">
                ¥{(avgValuation / 1000000).toFixed(1)}M
              </span>
              <span className="text-[10px] text-stone-400">per property</span>
            </div>
          </div>
        </section>

        {/* Filter, Search & View Mode Switcher */}
        <section aria-label="Filters and View Controls" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, location, code, or kanji..."
                className="w-full px-4 py-2 text-xs bg-white border border-stone-300/80 focus:outline-none focus:border-[var(--color-sumi)] text-[var(--color-sumi)] placeholder:text-stone-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Mode Toggle: Table (Task 2) vs Cards (Task 3) */}
            <div className="flex items-center gap-1 self-end sm:self-auto bg-white border border-stone-300/80 p-1">
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 text-xs tracking-wider uppercase transition-colors cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-[var(--color-sumi)] text-[var(--color-washi)]'
                    : 'text-[var(--color-mist)] hover:text-[var(--color-sumi)]'
                }`}
                title="Data Table Management View"
              >
                Table View (Таблица)
              </button>
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 text-xs tracking-wider uppercase transition-colors cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-[var(--color-sumi)] text-[var(--color-washi)]'
                    : 'text-[var(--color-mist)] hover:text-[var(--color-sumi)]'
                }`}
                title="Property Cards Grid View"
              >
                Cards View (Карточки)
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[10px] uppercase tracking-wider text-[var(--color-mist)] mr-1 flex-shrink-0">
              Filter:
            </span>
            {propertyTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFilterType(type)}
                className={`px-3 py-1 text-xs tracking-wider whitespace-nowrap transition-colors border cursor-pointer ${
                  filterType === type
                    ? 'bg-[var(--color-sumi)] text-[var(--color-washi)] border-[var(--color-sumi)]'
                    : 'bg-white text-stone-600 border-stone-300/80 hover:border-stone-400'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </section>

        {/* Primary View: Table vs Cards */}
        <section aria-label="Properties Display">
          {viewMode === 'table' ? (
            <PropertyTable />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-300/60 bg-[#FAF8F5] py-8 text-center text-xs text-[var(--color-mist)] tracking-widest uppercase">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>間 不動産 • Ma Estate Architecture</span>
          <span className="text-[10px] text-stone-400 normal-case">
            Lab 1 Assignment • React + Vite + React Router
          </span>
        </div>
      </footer>

      {/* Floating Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[var(--color-sumi)] text-[var(--color-washi)] px-4 py-3 text-xs tracking-wider shadow-lg flex items-center gap-3 border border-stone-700 animate-in fade-in slide-in-from-bottom-3">
          <span className="w-2 h-2 rounded-full bg-[var(--color-take)]"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      <PropertyDetailModal />
      <AddPropertyModal />
    </div>
  );
}
