import { Link } from 'react-router-dom';
import { PokemonCard } from '../types/pokemon';
import { TYPE_COLORS, RARITY_COLORS } from '../constants/pokemon';
import { useState } from 'react';

interface CardThumbnailProps {
  card: PokemonCard;
  showSet?: boolean;
}

export default function CardThumbnail({ card, showSet = true }: CardThumbnailProps) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const primaryType = card.types?.[0];
  const typeColor = primaryType ? TYPE_COLORS[primaryType] : TYPE_COLORS['Colorless'];
  const rarityColor = card.rarity ? RARITY_COLORS[card.rarity] || 'text-gray-500' : 'text-gray-400';

  const getPrice = () => {
    const prices = card.tcgplayer?.prices;
    if (!prices) return null;
    const priceData = prices.holofoil || prices.normal || prices.reverseHolofoil;
    if (priceData?.market) return priceData.market.toFixed(2);
    return null;
  };

  const price = getPrice();

  return (
    <Link
      to={`/card/${card.id}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card image area */}
      <div className={`relative bg-gradient-to-br ${
        hovered ? 'from-gray-50' : 'from-white'
      } to-gray-50 p-2 pt-3 flex items-center justify-center overflow-hidden`}>
        {/* Type glow */}
        {primaryType && hovered && (
          <div className={`absolute inset-0 opacity-10 ${typeColor.bg}`} />
        )}

        {!imgError ? (
          <img
            src={card.images.small}
            alt={card.name}
            onError={() => setImgError(true)}
            className="w-full h-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105 relative z-10"
            loading="lazy"
          />
        ) : (
          <div className="w-full aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-4xl">🃏</span>
          </div>
        )}

        {/* HP Badge */}
        {card.hp && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow">
            HP {card.hp}
          </div>
        )}
      </div>

      {/* Card Info */}
      <div className="p-2.5 flex flex-col gap-1 flex-1">
        <div className="flex items-start justify-between gap-1">
          <h3 className="text-xs font-bold text-gray-800 leading-tight line-clamp-2 flex-1">{card.name}</h3>
          {primaryType && (
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0 ${typeColor.badge}`}>
              {primaryType}
            </span>
          )}
        </div>

        {/* Rarity */}
        {card.rarity && (
          <p className={`text-[10px] font-medium truncate ${rarityColor}`}>{card.rarity}</p>
        )}

        {/* Set name */}
        {showSet && (
          <p className="text-[10px] text-gray-400 truncate">{card.set.name}</p>
        )}

        {/* Price */}
        {price && (
          <div className="mt-1 pt-1.5 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[10px] text-gray-400">市场价</span>
            <span className="text-xs font-bold text-green-600">${price}</span>
          </div>
        )}
      </div>

      {/* Hover overlay */}
      <div className={`absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-red-400 transition-all duration-300 pointer-events-none`} />
    </Link>
  );
}
