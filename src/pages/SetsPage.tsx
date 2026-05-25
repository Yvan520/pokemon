import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Package } from 'lucide-react';
import { CardSet } from '../types/pokemon';
import { getSets } from '../api/pokemonTCG';
import { usePageMeta } from '../hooks/usePageMeta';

export default function SetsPage() {
  const navigate = useNavigate();
  const [sets, setSets] = useState<CardSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getSets()
      .then(res => setSets(res.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const grouped = sets.reduce<Record<string, CardSet[]>>((acc, set) => {
    const series = set.series || 'Other';
    if (!acc[series]) acc[series] = [];
    acc[series].push(set);
    return acc;
  }, {});

  const filtered = search
    ? sets.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.series.toLowerCase().includes(search.toLowerCase())
      )
    : null;

  const displayGroups = filtered
    ? { '搜索结果': filtered }
    : grouped;

  usePageMeta(
    '📦 卡包系列 — PokéDex TCG | 浏览所有宝可梦 TCG 系列',
    '浏览 150+ 宝可梦集换式卡牌游戏卡包系列，按系列分组查看所有已发布的卡包和扩展包。',
    '宝可梦卡包, Pokemon TCG系列, 扩展包, 宝可梦集换式卡牌'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <Package className="mx-auto text-white/80 mb-3" size={36} />
          <h1 className="text-3xl font-black text-white mb-2">卡包系列</h1>
          <p className="text-red-200">浏览所有宝可梦 TCG 卡包系列</p>
          <div className="mt-5 flex justify-center">
            <div className="relative max-w-md w-full">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="搜索卡包名称或系列..."
                className="w-full bg-white rounded-xl pl-9 pr-4 py-2.5 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 rounded-full border-4 border-red-200 border-t-red-500 animate-spin" />
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(displayGroups).map(([series, seriesSets]) => (
              <div key={series}>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-lg font-black text-gray-800">{series}</h2>
                  <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full font-semibold">
                    {seriesSets.length} 个系列
                  </span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {seriesSets.map(set => (
                    <button
                      key={set.id}
                      onClick={() => navigate(`/search?setId=${set.id}&setName=${encodeURIComponent(set.name)}`)}
                      className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all text-left group flex flex-col"
                    >
                      {/* Set logo */}
                      <div className="h-12 flex items-center mb-3">
                        {set.images?.logo ? (
                          <img
                            src={set.images.logo}
                            alt={set.name}
                            className="max-h-full max-w-full object-contain object-left"
                          />
                        ) : (
                          <div className="text-2xl">📦</div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mb-1.5">
                        {set.images?.symbol && (
                          <img src={set.images.symbol} alt="" className="h-4 w-auto" />
                        )}
                        <p className="text-xs font-bold text-gray-700 group-hover:text-red-600 transition-colors line-clamp-2">{set.name}</p>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        <p className="text-[11px] text-gray-400">{set.releaseDate}</p>
                        <p className="text-[11px] font-semibold text-gray-500">{set.total}张</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {Object.keys(displayGroups).length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <Search size={40} className="mx-auto mb-3 opacity-30" />
                <p className="font-medium">未找到匹配的卡包系列</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
