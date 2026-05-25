import { PokemonCard } from '../types/pokemon';
import CardThumbnail from './CardThumbnail';


interface CardGridProps {
  cards: PokemonCard[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
}

export default function CardGrid({ cards, loading, error, emptyMessage }: CardGridProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-red-200 border-t-red-500 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg">⚡</span>
          </div>
        </div>
        <p className="text-gray-500 font-medium">加载卡牌中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-3xl">⚠️</div>
        <div className="text-center">
          <p className="text-red-600 font-semibold">加载失败</p>
          <p className="text-gray-500 text-sm mt-1">{error}</p>
          <p className="text-gray-400 text-xs mt-1">请检查网络连接或稍后重试</p>
        </div>
      </div>
    );
  }

  if (!cards.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl">🔍</div>
        <div className="text-center">
          <p className="text-gray-600 font-semibold">{emptyMessage || '未找到卡牌'}</p>
          <p className="text-gray-400 text-sm mt-1">请尝试其他关键词或筛选条件</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {cards.map(card => (
        <CardThumbnail key={card.id} card={card} />
      ))}
    </div>
  );
}
