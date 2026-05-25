import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { usePokemonCards } from '../hooks/usePokemonCards';
import CardGrid from '../components/CardGrid';
import Pagination from '../components/Pagination';
import { POKEMON_TYPES, TYPE_EMOJIS } from '../constants/pokemon';
import { buildQuery } from '../api/pokemonTCG';
import { usePageMeta } from '../hooks/usePageMeta';

const RARITIES = [
  'Common', 'Uncommon', 'Rare', 'Rare Holo', 'Rare Holo EX',
  'Rare Holo GX', 'Rare Holo V', 'Rare Holo VMAX', 'Rare Holo VSTAR',
  'Rare Ultra', 'Rare Secret', 'Rare Rainbow', 'Amazing Rare',
  'Illustration Rare', 'Special Illustration Rare', 'Hyper Rare',
];

const SUPERTYPES = ['Pokémon', 'Trainer', 'Energy'];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  // Filter state
  const [nameInput, setNameInput] = useState(searchParams.get('name') || '');
  const [filters, setFilters] = useState({
    name: searchParams.get('name') || '',
    type: searchParams.get('type') || '',
    rarity: searchParams.get('rarity') || '',
    supertype: searchParams.get('supertype') || '',
    set: '',
  });

  const { cards, loading, error, page, totalCount, totalPages, search, goToPage } = usePokemonCards({
    initialQuery: (() => {
      // Build initial query from URL params
      const q = searchParams.get('q');
      if (q) return q;
      return buildQuery({
        name: searchParams.get('name') || '',
        type: searchParams.get('type') || '',
        rarity: searchParams.get('rarity') || '',
        supertype: searchParams.get('supertype') || '',
        set: searchParams.get('setId') || searchParams.get('setName') || '',
      });
    })(),
    pageSize: 20,
  });

  useEffect(() => {
    const q = searchParams.get('q');
    const name = searchParams.get('name') || '';
    const type = searchParams.get('type') || '';
    const setId = searchParams.get('setId') || '';
    const setName = searchParams.get('setName') || '';

    if (q) {
      search({});
      return;
    }

    const newFilters = { name, type, rarity: '', supertype: '', set: setId || setName };
    setFilters(newFilters);
    setNameInput(name);
    search(newFilters);
  }, [searchParams]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const newFilters = { ...filters, name: nameInput };
    setFilters(newFilters);
    syncUrl(newFilters);
    search(newFilters);
  };

  const syncUrl = (f: typeof filters) => {
    const params = new URLSearchParams();
    if (f.name) params.set('name', f.name);
    if (f.type) params.set('type', f.type);
    if (f.rarity) params.set('rarity', f.rarity);
    if (f.supertype) params.set('supertype', f.supertype);
    if (f.set) params.set('set', f.set);
    setSearchParams(params, { replace: true });
  };

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    syncUrl(newFilters);
    search(newFilters);
  };

  const clearFilter = (key: keyof typeof filters) => {
    const newFilters = { ...filters, [key]: '' };
    if (key === 'name') setNameInput('');
    setFilters(newFilters);
    syncUrl(newFilters);
    search(newFilters);
  };

  const clearAll = () => {
    setNameInput('');
    const reset = { name: '', type: '', rarity: '', supertype: '', set: '' };
    setFilters(reset);
    syncUrl(reset);
    search(reset);
  };

  const appliedCount = Object.values({ ...filters, name: nameInput }).filter(Boolean).length;

  const setName = searchParams.get('setName');

  const pageTitle = setName ? `${setName} — 卡包系列 | PokéDex TCG` : '🔍 搜索卡牌 — PokéDex TCG';
  const pageDesc = setName
    ? `浏览 ${setName} 卡包系列中的宝可梦卡牌`
    : '搜索宝可梦 TCG 卡牌，按名称、属性、稀有度、分类筛选';
  usePageMeta(pageTitle, pageDesc);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl font-black text-white mb-1">
            {setName ? `📦 ${setName}` : '🔍 搜索卡牌'}
          </h1>
          <p className="text-red-200 text-sm">
            {totalCount > 0 ? `找到 ${totalCount.toLocaleString()} 张匹配的卡牌` : '输入关键词开始搜索'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
          {/* Main search */}
          <form onSubmit={handleSearch} className="flex gap-2 mb-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                placeholder="按宝可梦名称搜索..."
                className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-100"
              />
              {nameInput && (
                <button type="button" onClick={() => { setNameInput(''); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors"
            >
              搜索
            </button>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                showFilters || appliedCount > 1
                  ? 'bg-red-50 border-red-300 text-red-600'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <SlidersHorizontal size={15} />
              筛选
              {appliedCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {appliedCount}
                </span>
              )}
              <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </form>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t border-gray-100 pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Type */}
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">属性类型</label>
                <div className="relative">
                  <select
                    value={filters.type}
                    onChange={e => handleFilterChange('type', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm appearance-none focus:outline-none focus:border-red-400 bg-white"
                  >
                    <option value="">全部属性</option>
                    {POKEMON_TYPES.map(t => (
                      <option key={t} value={t}>{TYPE_EMOJIS[t]} {t}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Rarity */}
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">稀有度</label>
                <div className="relative">
                  <select
                    value={filters.rarity}
                    onChange={e => handleFilterChange('rarity', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm appearance-none focus:outline-none focus:border-red-400 bg-white"
                  >
                    <option value="">全部稀有度</option>
                    {RARITIES.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Supertype */}
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">卡片分类</label>
                <div className="relative">
                  <select
                    value={filters.supertype}
                    onChange={e => handleFilterChange('supertype', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm appearance-none focus:outline-none focus:border-red-400 bg-white"
                  >
                    <option value="">全部分类</option>
                    {SUPERTYPES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          )}

          {/* Active filters tags */}
          {(filters.type || filters.rarity || filters.supertype || filters.name) && (
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500 self-center">筛选中：</span>
              {filters.name && (
                <span className="flex items-center gap-1 bg-red-50 text-red-700 text-xs px-2.5 py-1 rounded-full border border-red-200">
                  名称: {filters.name}
                  <button onClick={() => clearFilter('name')}><X size={12} /></button>
                </span>
              )}
              {filters.type && (
                <span className="flex items-center gap-1 bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full border border-blue-200">
                  {TYPE_EMOJIS[filters.type]} {filters.type}
                  <button onClick={() => clearFilter('type')}><X size={12} /></button>
                </span>
              )}
              {filters.rarity && (
                <span className="flex items-center gap-1 bg-purple-50 text-purple-700 text-xs px-2.5 py-1 rounded-full border border-purple-200">
                  {filters.rarity}
                  <button onClick={() => clearFilter('rarity')}><X size={12} /></button>
                </span>
              )}
              {filters.supertype && (
                <span className="flex items-center gap-1 bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-full border border-green-200">
                  {filters.supertype}
                  <button onClick={() => clearFilter('supertype')}><X size={12} /></button>
                </span>
              )}
              <button onClick={clearAll} className="text-xs text-gray-400 hover:text-red-500 ml-1">清空全部</button>
            </div>
          )}
        </div>

        {/* Card Grid */}
        <CardGrid cards={cards} loading={loading} error={error} />

        {/* Pagination */}
        {!loading && !error && cards.length > 0 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={goToPage}
            totalCount={totalCount}
            pageSize={20}
          />
        )}
      </div>
    </div>
  );
}
