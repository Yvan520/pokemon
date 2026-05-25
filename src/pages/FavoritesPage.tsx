import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowLeft, Search } from 'lucide-react';
import { PokemonCard } from '../types/pokemon';
import { getCard } from '../api/pokemonTCG';
import CardThumbnail from '../components/CardThumbnail';
import { useFavorites } from '../hooks/useFavorites';
import { usePageMeta } from '../hooks/usePageMeta';

export default function FavoritesPage() {
  const { favorites, clearFavorites, toggleFavorite } = useFavorites();
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favorites.length === 0) {
      setCards([]);
      setLoading(false);
      return;
    }
    Promise.allSettled(favorites.map(id => getCard(id)))
      .then(results => {
        const resolved: PokemonCard[] = [];
        results.forEach(r => {
          if (r.status === 'fulfilled' && r.value.data) {
            resolved.push(r.value.data);
          }
        });
        setCards(resolved);
      })
      .finally(() => setLoading(false));
  }, [favorites]);

  usePageMeta(
    '我的收藏 — PokéDex TCG',
    '你收藏的宝可梦卡牌列表',
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-gray-400 hover:text-gray-600 transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <Heart size={22} className="text-red-500 fill-red-500" />
                <h1 className="text-2xl font-black text-gray-800">我的收藏</h1>
              </div>
              <p className="text-sm text-gray-500 mt-0.5">
                共 {favorites.length} 张卡牌
              </p>
            </div>
          </div>
          {favorites.length > 0 && (
            <button
              onClick={clearFavorites}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 bg-white border border-gray-200 px-3 py-2 rounded-xl hover:border-red-200 transition-all"
            >
              <Trash2 size={14} />
              <span>清空</span>
            </button>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-gray-100 animate-pulse aspect-[3/4]" />
            ))}
          </div>
        ) : favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Heart size={48} className="text-gray-300" />
            <h2 className="text-xl font-bold text-gray-500">还没有收藏</h2>
            <p className="text-gray-400 text-sm">浏览卡牌时点击 ❤️ 按钮即可收藏</p>
            <Link
              to="/search"
              className="flex items-center gap-2 bg-red-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-red-600 transition-colors"
            >
              <Search size={16} />
              去搜索卡牌
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {cards.map(card => (
              <div key={card.id} className="relative group/card">
                <button
                  onClick={() => toggleFavorite(card.id)}
                  className="absolute top-2 right-2 z-20 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover/card:opacity-100 transition-opacity hover:bg-white"
                >
                  <Heart size={14} className="text-red-500 fill-red-500" />
                </button>
                <CardThumbnail card={card} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
