import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Zap, Shield, Star, TrendingUp, ChevronRight, Database, Clock, Sparkles } from 'lucide-react';
import { PokemonCard, CardSet } from '../types/pokemon';
import { searchCards, getSets } from '../api/pokemonTCG';
import CardThumbnail from '../components/CardThumbnail';
import { FEATURED_SEARCHES, TYPE_EMOJIS, POKEMON_TYPES } from '../constants/pokemon';
import { usePageMeta } from '../hooks/usePageMeta';
import { useFavorites } from '../hooks/useFavorites';

const POCKET_SETS = [
  { id: 'sv1', name: 'Scarlet & Violet', emoji: '🌺' },
  { id: 'sv2', name: 'Paldea Evolved', emoji: '🏝️' },
  { id: 'sv3', name: 'Obsidian Flames', emoji: '🔥' },
  { id: 'sv4', name: 'Paradox Rift', emoji: '🌀' },
  { id: 'sv5', name: 'Temporal Forces', emoji: '⏳' },
  { id: 'sv6', name: 'Twilight Masquerade', emoji: '🎭' },
  { id: 'sv7', name: 'Stellar Crown', emoji: '👑' },
  { id: 'sv8', name: 'Surging Sparks', emoji: '⚡' },
];

function daysSince(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 86400000);
  if (diff < 1) return '今天发布';
  if (diff === 1) return '昨天发布';
  if (diff < 30) return `${diff} 天前发布`;
  if (diff < 365) return `${Math.floor(diff / 30)} 个月前发布`;
  return `${Math.floor(diff / 365)} 年前发布`;
}

export default function HomePage() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  const [searchInput, setSearchInput] = useState('');
  const [featuredCards, setFeaturedCards] = useState<PokemonCard[]>([]);
  const [hotCards, setHotCards] = useState<PokemonCard[]>([]);
  const [recentSets, setRecentSets] = useState<CardSet[]>([]);
  const [loadingCards, setLoadingCards] = useState(true);
  const [loadingHot, setLoadingHot] = useState(true);
  const [loadingSets, setLoadingSets] = useState(true);

  useEffect(() => {
    searchCards('', 1, 12, '-set.releaseDate')
      .then(res => setFeaturedCards(res.data || []))
      .catch(console.error)
      .finally(() => setLoadingCards(false));

    searchCards('supertype:Pokémon', 1, 10, '-set.releaseDate')
      .then(res => setHotCards(res.data || []))
      .catch(console.error)
      .finally(() => setLoadingHot(false));

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

  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PokéDex TCG',
    url: 'https://www.gamewayz.com/',
    description: '全球最完整的宝可梦集换式卡牌数据库。搜索 18,000+ 张卡牌，查看技能、稀有度、价格信息。',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: 'https://www.gamewayz.com/search?name={search_term_string}' },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-red-500/20 rounded-full -translate-x-1/2 -translate-y-1/2" />

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

      {/* PTCG Pocket Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">
        <div className="relative bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="flex-shrink-0 w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <Sparkles size={28} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1 mb-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Pokémon TCG Pocket</span>
              </div>
              <h2 className="text-2xl font-black text-white mb-1">Pocket 专属卡牌</h2>
              <p className="text-cyan-100 text-sm">浏览宝可梦 TCG Pocket 游戏内的卡牌，包含 Genetic Apex、Mythical Island 等系列</p>
            </div>
            <button
              onClick={() => navigate('/search?q=supertype:Pokémon&page=1')}
              className="flex-shrink-0 bg-white text-teal-700 font-bold px-5 py-3 rounded-xl hover:bg-teal-50 transition-all text-sm"
            >
              进入专区 <ChevronRight size={15} className="inline" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
          {POCKET_SETS.map(s => (
            <button
              key={s.id}
              onClick={() => navigate(`/search?setId=${s.id}&setName=${encodeURIComponent(s.name)}`)}
              className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-left flex items-center gap-2"
            >
              <span className="text-base">{s.emoji}</span>
              <span className="text-xs font-semibold text-gray-700 truncate">{s.name}</span>
            </button>
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

      {/* Hot Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <TrendingUp size={20} className="text-red-500" />
            <div>
              <h2 className="text-xl font-black text-gray-800">热门卡牌</h2>
              <p className="text-gray-500 text-sm">近期关注度最高的宝可梦卡牌</p>
            </div>
          </div>
        </div>

        {loadingHot ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-gray-100 animate-pulse aspect-[3/4]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {hotCards.map((card, i) => (
              <div key={card.id} className="relative">
                {i < 3 && (
                  <div className={`absolute -top-2 -left-2 z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white shadow-lg ${
                    i === 0 ? 'bg-red-500' : i === 1 ? 'bg-orange-500' : 'bg-amber-500'
                  }`}>
                    {i + 1}
                  </div>
                )}
                <CardThumbnail card={card} />
              </div>
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
                  <div className="flex items-center gap-1">
                    <Clock size={10} className="text-gray-300" />
                    <p className="text-[11px] text-gray-400">{daysSince(set.releaseDate)}</p>
                  </div>
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
          <Link to="/guides" className="text-gray-500 hover:text-white transition-colors">攻略指南</Link>
          <span className="text-gray-600">·</span>
          <Link to="/about" className="text-gray-500 hover:text-white transition-colors">关于本站</Link>
          <span className="text-gray-600">·</span>
          <Link to="/privacy" className="text-gray-500 hover:text-white transition-colors">隐私政策</Link>
          <span className="text-gray-600">·</span>
          <Link to="/favorites" className="text-gray-500 hover:text-white transition-colors">我的收藏</Link>
          <span className="text-gray-600">·</span>
          <Link to="/" className="text-gray-500 hover:text-white transition-colors">首页</Link>
        </p>
        <p className="mt-1 text-xs">本站与任天堂/宝可梦公司无官方关联，仅供爱好者学习参考</p>
      </footer>
    </div>
  );
}
