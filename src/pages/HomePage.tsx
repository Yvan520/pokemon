import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Zap, Shield, Star, TrendingUp, ChevronRight, Database } from 'lucide-react';
import { PokemonCard, CardSet } from '../types/pokemon';
import { searchCards, getSets } from '../api/pokemonTCG';
import CardThumbnail from '../components/CardThumbnail';
import { FEATURED_SEARCHES, TYPE_EMOJIS, POKEMON_TYPES } from '../constants/pokemon';
import { usePageMeta } from '../hooks/usePageMeta';

export default function HomePage() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [featuredCards, setFeaturedCards] = useState<PokemonCard[]>([]);
  const [recentSets, setRecentSets] = useState<CardSet[]>([]);
  const [loadingCards, setLoadingCards] = useState(true);
  const [loadingSets, setLoadingSets] = useState(true);


  useEffect(() => {
    // Load featured cards (recent popular cards)
    searchCards('', 1, 12, '-set.releaseDate')
      .then(res => setFeaturedCards(res.data || []))
      .catch(console.error)
      .finally(() => setLoadingCards(false));

    // Load recent sets
    getSets()
      .then(res => setRecentSets((res.data || []).slice(0, 8)))
      .catch(console.error)
      .finally(() => setLoadingSets(false));
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?name=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const handleFeaturedSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleTypeClick = (type: string) => {
    navigate(`/search?type=${encodeURIComponent(type)}`);
  };

  const stats = [
    { icon: <Database size={20} />, label: '卡牌总量', value: '18,000+', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: <Shield size={20} />, label: '卡包系列', value: '150+', color: 'text-green-600', bg: 'bg-green-50' },
    { icon: <Star size={20} />, label: '卡牌类型', value: '11', color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { icon: <TrendingUp size={20} />, label: '含价格信息', value: '95%', color: 'text-red-600', bg: 'bg-red-50' },
  ];

  usePageMeta(
    'PokéDex TCG — 宝可梦卡牌数据库 | 搜索所有宝可梦卡牌',
    '全球最完整的宝可梦集换式卡牌数据库。搜索 18,000+ 张卡牌，查看技能、稀有度、价格信息和卡包系列。',
    '宝可梦卡牌, Pokemon TCG, 宝可梦, 卡牌数据库, 宝可梦卡牌搜索, PTCG'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-900 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-red-500/20 rounded-full -translate-x-1/2 -translate-y-1/2" />

        {/* Pokeball decoration */}
        <div className="absolute right-8 top-8 w-48 h-48 opacity-10">
          <div className="w-full h-full rounded-full border-8 border-white relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/20" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2" />
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-white -translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border-4 border-white" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Zap size={14} className="text-yellow-300" />
              <span className="text-white/90 text-sm font-medium">全球最完整的宝可梦卡牌数据库</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
              探索所有
              <span className="text-yellow-300">宝可梦</span>
              <br />集换式卡牌
            </h1>
            <p className="text-red-100 text-lg mb-8 leading-relaxed">
              搜索 18,000+ 张卡牌，查看技能、稀有度、历史价格信息，<br className="hidden sm:block" />
              追踪你的最爱！
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-2 max-w-xl">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  placeholder="输入宝可梦名称，如 Charizard, Pikachu..."
                  className="w-full bg-white rounded-2xl pl-11 pr-4 py-4 text-gray-800 placeholder-gray-400 shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-base font-medium"
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-300 text-red-800 font-bold px-6 py-4 rounded-2xl shadow-xl hover:shadow-yellow-200/50 transition-all active:scale-95 text-base"
              >
                搜索
              </button>
            </form>

            {/* Quick searches */}
            <div className="flex flex-wrap gap-2 mt-4">
              {FEATURED_SEARCHES.map(item => (
                <button
                  key={item.label}
                  onClick={() => handleFeaturedSearch(item.query)}
                  className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 rounded-full px-3 py-1.5 text-sm transition-all hover:scale-105"
                >
                  <span>{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 flex items-center gap-3">
              <div className={`${stat.bg} ${stat.color} p-2 rounded-xl`}>{stat.icon}</div>
              <div>
                <p className="text-lg font-black text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-black text-gray-800">按类型浏览</h2>
            <p className="text-gray-500 text-sm">选择宝可梦属性快速筛选</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {POKEMON_TYPES.map(type => (
            <button
              key={type}
              onClick={() => handleTypeClick(type)}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-gray-200 hover:border-red-300 hover:shadow-md transition-all font-medium text-sm text-gray-700 hover:text-red-600"
            >
              <span className="text-base">{TYPE_EMOJIS[type]}</span>
              <span>{type}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Latest Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-black text-gray-800">最新卡牌</h2>
            <p className="text-gray-500 text-sm">来自最新发布的卡包</p>
          </div>
          <button
            onClick={() => navigate('/search')}
            className="flex items-center gap-1 text-red-600 hover:text-red-700 font-semibold text-sm"
          >
            查看全部 <ChevronRight size={16} />
          </button>
        </div>

        {loadingCards ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-gray-100 animate-pulse aspect-[3/4]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {featuredCards.map(card => (
              <CardThumbnail key={card.id} card={card} />
            ))}
          </div>
        )}
      </div>

      {/* Recent Sets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 mb-16">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-black text-gray-800">最新卡包</h2>
            <p className="text-gray-500 text-sm">最近发布的卡牌系列</p>
          </div>
          <button
            onClick={() => navigate('/sets')}
            className="flex items-center gap-1 text-red-600 hover:text-red-700 font-semibold text-sm"
          >
            全部系列 <ChevronRight size={16} />
          </button>
        </div>

        {loadingSets ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-gray-100 animate-pulse h-32" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {recentSets.map(set => (
              <button
                key={set.id}
                onClick={() => navigate(`/search?setId=${set.id}&setName=${encodeURIComponent(set.name)}`)}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all text-left group"
              >
                <div className="flex items-center gap-3 mb-2">
                  {set.images?.symbol && (
                    <img src={set.images.symbol} alt="" className="h-6 w-auto object-contain" />
                  )}
                  <span className="text-xs text-gray-400 font-medium">{set.series}</span>
                </div>
                {set.images?.logo && (
                  <img
                    src={set.images.logo}
                    alt={set.name}
                    className="w-full h-12 object-contain object-left mb-2"
                  />
                )}
                <p className="text-xs font-semibold text-gray-700 group-hover:text-red-600 transition-colors line-clamp-1">{set.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-[11px] text-gray-400">{set.releaseDate}</p>
                  <p className="text-[11px] text-gray-400">{set.total} 张</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p className="font-semibold text-white mb-1">PokéDex TCG</p>
        <p>数据来源：<a href="https://pokemontcg.io" target="_blank" rel="noreferrer" className="text-red-400 hover:underline">pokemontcg.io</a></p>
        <p className="mt-2 flex items-center justify-center gap-3 text-xs">
          <Link to="/about" className="text-gray-500 hover:text-white transition-colors">关于本站</Link>
          <span className="text-gray-600">·</span>
          <Link to="/privacy" className="text-gray-500 hover:text-white transition-colors">隐私政策</Link>
          <span className="text-gray-600">·</span>
          <Link to="/" className="text-gray-500 hover:text-white transition-colors">首页</Link>
        </p>
        <p className="mt-1 text-xs">本站与任天堂/宝可梦公司无官方关联，仅供爱好者学习参考</p>
      </footer>
    </div>
  );
}
