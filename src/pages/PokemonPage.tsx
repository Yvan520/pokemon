import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, ChevronRight, ArrowLeft, BookOpen } from 'lucide-react';
import { PokemonCard } from '../types/pokemon';
import { searchCards } from '../api/pokemonTCG';
import CardThumbnail from '../components/CardThumbnail';
import { usePageMeta } from '../hooks/usePageMeta';

const POKEMON_DESCRIPTIONS: Record<string, string> = {
  'Charizard': '喷火龙是宝可梦中最具代表性的火系宝可梦，在 TCG 中拥有最多版本的卡牌之一。从最初的 Base Set 到最新系列，喷火龙卡牌始终是收藏家的终极目标。其强大的火焰系招式和高 HP 使其在竞技环境中同样出色。',
  'Pikachu': '皮卡丘是宝可梦的吉祥物，在 TCG 中拥有大量卡牌版本。作为电系宝可梦的代言人，皮卡丘的卡牌涵盖了从基础形态到 VMAX 的各种版本。皮卡丘卡牌因其亲民的形象和稀有版本的高收藏价值深受玩家喜爱。',
  'Mewtwo': '超梦是第一世代的传说宝可梦，在 TCG 中一直是超能系的顶级战力。从最初的 Base Set 超梦到最新的 ex 版本，超梦卡牌以强大的精神系招式和压倒性的战斗数据著称。',
  'Greninja': '甲贺忍蛙因其独特的忍者设计和在动画中的出色表现积累了极高的人气。在 TCG 中，甲贺忍蛙的卡牌通常以高速攻击和水系能量效率闻名。BREAK 版本的甲贺忍蛙曾经是竞技环境的一线战力。',
  'Lucario': '路卡利欧是斗系的代表宝可梦之一，以其波导能力著称。路卡利欧卡牌在 TCG 中通常具备高效的斗系招式和优秀的辅助能力。Mega 路卡利欧和路卡利欧 VSTAR 都是竞技环境中的热门选择。',
  'Gengar': '耿鬼以其神秘诡谲的形象成为超能系/恶系最具人气的宝可梦之一。耿鬼卡牌在 TCG 中经常拥有扰乱对手手牌或弃牌区的特殊能力，配合高伤害的恶系招式，是控制型卡组的核心。',
  'Eevee': '伊布是宝可梦中最特别的存在——拥有最多的进化形态。在 TCG 中，伊布衍生出了水（水伊布）、电（雷伊布）、火（火伊布）、超（太阳伊布）、恶（月伊布）、草（叶伊布）、冰（冰伊布）、妖（仙子伊布）共 8 种进化版本。月伊布 VMAX（Moonbreon）是 TCG 历史上最贵重的现代卡牌之一。',
  'Rayquaza': '烈空坐是天气三神之一的传说宝可梦，龙系和飞行系的代表。烈空坐卡牌在 TCG 中通常拥有华丽的视觉效果和强大的龙系招式。Mega 烈空坐是 TCG 历史上最具统治力的卡牌之一，其色彩鲜明的 Mega 进化形态更是收藏家追捧的对象。',
  'Umbreon': '月伊布是伊布家族中最受欢迎的成员之一，以其优雅的黑色设计和神秘气质捕获了无数玩家的心。月伊布 VMAX（来自 Evolving Skies 系列，编号 215/203）是宝可梦 TCG 现代系列中最具价值的卡牌，PSA 10 评级版在拍卖中屡创新高。',
  'Gardevoir': '沙奈朵是超能系/妖系的宝可梦，在 TCG 中一直是顶级战术卡牌的核心。从沙奈朵 ex 到沙奈朵 VMAX，其卡牌设计往往围绕能量操控和特殊能力展开，是高级玩家的首选。',
};

function getPokemonDescription(name: string): string {
  const lower = name.toLowerCase();
  for (const [key, desc] of Object.entries(POKEMON_DESCRIPTIONS)) {
    if (lower === key.toLowerCase() || lower.includes(key.toLowerCase())) {
      return desc;
    }
  }
  return `${name} 是宝可梦世界中的一只宝可梦，在宝可梦 TCG 中出现在多个卡包系列中，拥有多种不同版本和稀有度的卡牌。本页面收录了 ${name} 的所有已知 TCG 卡牌版本。`;
}

export default function PokemonPage() {
  const { name } = useParams<{ name: string }>();
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const decodedName = name ? decodeURIComponent(name) : '';

  useEffect(() => {
    if (!decodedName) return;
    setLoading(true);
    searchCards(`name:"${decodedName}"`, 1, 60, '-set.releaseDate')
      .then(res => {
        setCards(res.data || []);
        setTotalCount(res.totalCount || 0);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [decodedName]);

  const description = getPokemonDescription(decodedName);

  usePageMeta(
    `${decodedName} — 所有 TCG 卡牌版本 | PokéDex TCG`,
    `浏览 ${decodedName} 在宝可梦 TCG 中的所有卡牌版本，包括不同系列、稀有度、属性的完整列表。`,
    `${decodedName}, 宝可梦, TCG, 卡牌, Pokemon, ${decodedName}卡牌`
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Back */}
        <Link to="/search" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 mb-6 transition-colors">
          <ArrowLeft size={16} /> 返回搜索
        </Link>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Search size={20} className="text-gray-400" />
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">宝可梦</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-800">{decodedName}</h1>
            <p className="text-gray-500 mt-1">
              共 {loading ? '...' : totalCount} 张卡牌 · 收录于 {loading ? '...' : new Set(cards.map(c => c.set.name)).size} 个卡包系列
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-8">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={16} className="text-red-400" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">介绍</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
        </div>

        {/* Card Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-gray-100 animate-pulse aspect-[3/4]" />
            ))}
          </div>
        ) : cards.length > 0 ? (
          <>
            {/* Group by series */}
            {(() => {
              const groups: Record<string, PokemonCard[]> = {};
              cards.forEach(c => {
                const key = c.set.series || c.set.name;
                if (!groups[key]) groups[key] = [];
                groups[key].push(c);
              });
              return Object.entries(groups).map(([series, seriesCards]) => (
                <div key={series} className="mb-10">
                  <h2 className="text-lg font-black text-gray-700 mb-4 flex items-center gap-2">
                    <ChevronRight size={16} className="text-red-400" />
                    {series}
                    <span className="text-xs font-normal text-gray-400 ml-1">({seriesCards.length} 张)</span>
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {seriesCards.map(card => (
                      <CardThumbnail key={card.id} card={card} showSet={false} />
                    ))}
                  </div>
                </div>
              ));
            })()}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <Search size={48} className="text-gray-300 mb-4" />
            <h2 className="text-xl font-bold text-gray-500">未找到卡牌</h2>
            <p className="text-gray-400 text-sm mt-1">搜索不到 "{decodedName}" 的卡牌数据</p>
            <Link to="/search" className="mt-4 bg-red-500 text-white px-5 py-2 rounded-xl font-semibold text-sm hover:bg-red-600 transition-colors">
              重新搜索
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
