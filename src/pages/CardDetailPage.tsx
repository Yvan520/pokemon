import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, ExternalLink, Star, Shield, Zap,
  Activity, BookOpen, DollarSign, Info, ChevronRight
} from 'lucide-react';
import { PokemonCard } from '../types/pokemon';
import { getCard } from '../api/pokemonTCG';
import TypeBadge from '../components/TypeBadge';
import { usePageMeta } from '../hooks/usePageMeta';
import {
  TYPE_COLORS, RARITY_COLORS, RARITY_STARS, ENERGY_SYMBOLS
} from '../constants/pokemon';

export default function CardDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [card, setCard] = useState<PokemonCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'attacks' | 'prices'>('info');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getCard(id)
      .then(res => setCard(res.data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const cardTitle = card ? `${card.name} — ${card.set.name} | PokéDex TCG` : '卡牌详情 — PokéDex TCG';
  const cardDesc = card
    ? `${card.name}${card.hp ? ` HP${card.hp}` : ''}${card.types?.length ? ` · ${card.types.join('/')}` : ''}${card.rarity ? ` · ${card.rarity}` : ''}${card.artist ? ` · 插画: ${card.artist}` : ''}`
    : '查看宝可梦卡牌的技能、稀有度、价格信息';
  const cardKeywords = card
    ? `${card.name}, 宝可梦卡牌, ${card.types?.join(', ') || 'Pokemon'}, ${card.set.name}, PTCG, ${card.rarity || ''}`
    : undefined;
  usePageMeta(cardTitle, cardDesc, cardKeywords);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full border-4 border-red-200 border-t-red-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">加载卡牌详情...</p>
        </div>
      </div>
    );
  }

  if (error || !card) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">卡牌加载失败</h2>
          <p className="text-gray-500 mb-4">{error || '找不到该卡牌'}</p>
          <button onClick={() => navigate(-1)} className="bg-red-500 text-white px-5 py-2 rounded-xl font-semibold">返回</button>
        </div>
      </div>
    );
  }

  const primaryType = card.types?.[0];
  const typeColor = primaryType ? TYPE_COLORS[primaryType] : TYPE_COLORS['Colorless'];
  const rarityColor = card.rarity ? RARITY_COLORS[card.rarity] || 'text-gray-500' : 'text-gray-400';
  const rarityStars = card.rarity ? RARITY_STARS[card.rarity] || '' : '';

  const getPrices = () => {
    const p = card.tcgplayer?.prices;
    if (!p) return [];
    const result: { label: string; data: any }[] = [];
    if (p.normal) result.push({ label: '普通', data: p.normal });
    if (p.holofoil) result.push({ label: '闪卡', data: p.holofoil });
    if (p.reverseHolofoil) result.push({ label: '反面闪', data: p.reverseHolofoil });
    if (p.firstEditionNormal) result.push({ label: '初版普通', data: p.firstEditionNormal });
    if (p.firstEditionHolofoil) result.push({ label: '初版闪卡', data: p.firstEditionHolofoil });
    return result;
  };

  const prices = getPrices();
  const bestPrice = prices[0]?.data || prices[1]?.data;

  const energyToEmoji = (cost: string[]) =>
    cost.map(e => ENERGY_SYMBOLS[e] || e).join(' ');

  const tabs = [
    { key: 'info', label: '基本信息', icon: <Info size={14} /> },
    { key: 'attacks', label: '技能特性', icon: <Zap size={14} /> },
    { key: 'prices', label: '价格行情', icon: <DollarSign size={14} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 transition-colors text-sm font-medium mb-4 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          返回
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-6">
          <Link to="/" className="hover:text-red-500">首页</Link>
          <ChevronRight size={12} />
          <Link to="/search" className="hover:text-red-500">卡牌搜索</Link>
          <ChevronRight size={12} />
          <span className="text-gray-600">{card.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Card Image */}
          <div className="lg:col-span-2 flex flex-col items-center">
            {/* Card Image Container */}
            <div className={`relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br ${
              primaryType ? `from-gray-50` : 'from-white'
            } to-gray-100 p-4 w-full max-w-xs mx-auto`}>
              {/* Glow effect */}
              {primaryType && (
                <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${typeColor.bg} to-transparent`} />
              )}
              <img
                src={card.images.large || card.images.small}
                alt={card.name}
                onLoad={() => setImgLoaded(true)}
                className={`w-full h-auto rounded-2xl relative z-10 transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'} drop-shadow-xl`}
              />
              {!imgLoaded && (
                <div className="absolute inset-4 bg-gray-200 rounded-2xl animate-pulse" />
              )}
            </div>

            {/* Quick stats below image */}
            <div className="w-full max-w-xs mx-auto mt-4 grid grid-cols-3 gap-2">
              {card.hp && (
                <div className="bg-white rounded-xl p-2.5 text-center border border-gray-100 shadow-sm">
                  <Activity size={14} className="text-red-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">HP</p>
                  <p className="font-black text-gray-800 text-sm">{card.hp}</p>
                </div>
              )}
              {card.convertedRetreatCost !== undefined && (
                <div className="bg-white rounded-xl p-2.5 text-center border border-gray-100 shadow-sm">
                  <Shield size={14} className="text-blue-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">撤退</p>
                  <p className="font-black text-gray-800 text-sm">{card.convertedRetreatCost}</p>
                </div>
              )}
              {bestPrice?.market && (
                <div className="bg-white rounded-xl p-2.5 text-center border border-gray-100 shadow-sm">
                  <Star size={14} className="text-yellow-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-500">市价</p>
                  <p className="font-black text-green-600 text-sm">${bestPrice.market.toFixed(2)}</p>
                </div>
              )}
            </div>

            {/* Set info */}
            <div className="w-full max-w-xs mx-auto mt-3 bg-white rounded-xl p-3 border border-gray-100 shadow-sm flex items-center gap-3">
              {card.set.images?.symbol && (
                <img src={card.set.images.symbol} alt="" className="h-8 w-auto object-contain flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm truncate">{card.set.name}</p>
                <p className="text-xs text-gray-400">{card.set.series} · #{card.number}/{card.set.printedTotal}</p>
              </div>
              <button
                onClick={() => navigate(`/search?setId=${card.set.id}&setName=${encodeURIComponent(card.set.name)}`)}
                className="text-red-500 hover:text-red-600"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Right: Card Details */}
          <div className="lg:col-span-3">
            {/* Name & Type Header */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{card.supertype}</span>
                    {card.subtypes?.map(sub => (
                      <span key={sub} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{sub}</span>
                    ))}
                  </div>
                  <h1 className="text-3xl font-black text-gray-900">{card.name}</h1>
                  {card.evolvesFrom && (
                    <p className="text-sm text-gray-500 mt-1">进化自：
                      <button
                        onClick={() => navigate(`/search?name=${encodeURIComponent(card.evolvesFrom!)}`)}
                        className="text-red-500 hover:underline font-medium ml-1"
                      >
                        {card.evolvesFrom}
                      </button>
                    </p>
                  )}
                </div>
                {card.rarity && (
                  <div className="text-right flex-shrink-0">
                    <p className={`text-sm font-bold ${rarityColor}`}>{rarityStars}</p>
                    <p className={`text-xs font-medium ${rarityColor} mt-0.5`}>{card.rarity}</p>
                  </div>
                )}
              </div>

              {/* Types */}
              {card.types && card.types.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {card.types.map(t => <TypeBadge key={t} type={t} size="lg" />)}
                </div>
              )}

              {/* Flavor text */}
              {card.flavorText && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <p className="text-sm text-amber-800 italic leading-relaxed">「{card.flavorText}」</p>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex border-b border-gray-100">
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-semibold transition-all ${
                      activeTab === tab.key
                        ? 'text-red-600 border-b-2 border-red-500 bg-red-50/50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-5">
                {/* INFO TAB */}
                {activeTab === 'info' && (
                  <div className="space-y-4">
                    {/* Rules / Trainer text */}
                    {card.rules && card.rules.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                          <BookOpen size={13} /> 规则文字
                        </h3>
                        {card.rules.map((rule, i) => (
                          <div key={i} className="bg-blue-50 rounded-xl p-3 text-sm text-blue-800 border border-blue-100">
                            {rule}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {card.hp && (
                        <InfoRow label="HP" value={card.hp} icon="❤️" />
                      )}
                      {card.supertype && (
                        <InfoRow label="卡牌类型" value={card.supertype} icon="🃏" />
                      )}
                      {card.artist && (
                        <InfoRow label="插画师" value={card.artist} icon="🎨" />
                      )}
                      {card.number && (
                        <InfoRow label="卡牌编号" value={`#${card.number}`} icon="🔢" />
                      )}
                      {card.set.releaseDate && (
                        <InfoRow label="发售日期" value={card.set.releaseDate} icon="📅" />
                      )}
                      {card.nationalPokedexNumbers?.[0] && (
                        <InfoRow label="图鉴编号" value={`#${card.nationalPokedexNumbers[0]}`} icon="📖" />
                      )}
                    </div>

                    {/* Weaknesses & Resistances */}
                    {(card.weaknesses || card.resistances) && (
                      <div className="grid grid-cols-2 gap-3">
                        {card.weaknesses && (
                          <div className="bg-red-50 rounded-xl p-3 border border-red-100">
                            <p className="text-xs font-bold text-red-500 mb-2 flex items-center gap-1">
                              ⚠️ 弱点
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {card.weaknesses.map(w => (
                                <span key={w.type} className="flex items-center gap-1 text-xs bg-white rounded-lg px-2 py-1 border border-red-200 text-red-700 font-semibold">
                                  {w.type} {w.value}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {card.resistances && (
                          <div className="bg-green-50 rounded-xl p-3 border border-green-100">
                            <p className="text-xs font-bold text-green-600 mb-2">🛡️ 抵抗力</p>
                            <div className="flex flex-wrap gap-1.5">
                              {card.resistances.map(r => (
                                <span key={r.type} className="flex items-center gap-1 text-xs bg-white rounded-lg px-2 py-1 border border-green-200 text-green-700 font-semibold">
                                  {r.type} {r.value}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Legalities */}
                    {card.legalities && (
                      <div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">🏆 赛制合法性</h3>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(card.legalities).map(([format, status]) => (
                            <span key={format} className={`text-xs px-3 py-1 rounded-full font-semibold ${
                              status === 'Legal' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                            }`}>
                              {format}: {status === 'Legal' ? '✓ 合法' : '✗ 不合法'}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ATTACKS TAB */}
                {activeTab === 'attacks' && (
                  <div className="space-y-4">
                    {/* Abilities */}
                    {card.abilities && card.abilities.length > 0 && (
                      <div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1">
                          ✨ 特性
                        </h3>
                        <div className="space-y-3">
                          {card.abilities.map((ability, i) => (
                            <div key={i} className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="bg-purple-200 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full">{ability.type}</span>
                                <span className="font-bold text-purple-900">{ability.name}</span>
                              </div>
                              <p className="text-sm text-purple-800 leading-relaxed">{ability.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Attacks */}
                    {card.attacks && card.attacks.length > 0 ? (
                      <div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1">
                          ⚔️ 招式
                        </h3>
                        <div className="space-y-3">
                          {card.attacks.map((attack, i) => (
                            <div key={i} className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                              <div className="flex items-start justify-between gap-3 mb-2">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    {attack.cost.length > 0 && (
                                      <span className="text-sm">{energyToEmoji(attack.cost)}</span>
                                    )}
                                    <span className="font-bold text-gray-800">{attack.name}</span>
                                  </div>
                                  <p className="text-xs text-orange-600">费用: {attack.convertedEnergyCost} 能量</p>
                                </div>
                                {attack.damage && (
                                  <div className="bg-red-500 text-white font-black text-xl px-3 py-1 rounded-xl shadow-md flex-shrink-0">
                                    {attack.damage}
                                  </div>
                                )}
                              </div>
                              {attack.text && (
                                <p className="text-sm text-gray-700 leading-relaxed border-t border-orange-200 pt-2 mt-2">{attack.text}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      !card.abilities && (
                        <div className="text-center py-8 text-gray-400">
                          <Zap size={32} className="mx-auto mb-2 opacity-30" />
                          <p>该卡牌没有招式信息</p>
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* PRICES TAB */}
                {activeTab === 'prices' && (
                  <div className="space-y-4">
                    {prices.length > 0 ? (
                      <>
                        {prices.map(({ label, data }) => (
                          <div key={label} className="border border-gray-200 rounded-xl overflow-hidden">
                            <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200">
                              <h4 className="font-bold text-gray-700 text-sm">{label} 版本</h4>
                            </div>
                            <div className="grid grid-cols-4 divide-x divide-gray-100">
                              <PriceCell label="最低价" value={data.low} color="text-blue-600" />
                              <PriceCell label="中间价" value={data.mid} color="text-gray-700" />
                              <PriceCell label="市场价" value={data.market} color="text-green-600" highlight />
                              <PriceCell label="最高价" value={data.high} color="text-red-600" />
                            </div>
                          </div>
                        ))}

                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          <Info size={12} />
                          数据来源 TCGPlayer · 更新于 {card.tcgplayer?.updatedAt?.split('T')[0] || '最近'}
                        </div>

                        {card.tcgplayer?.url && (
                          <a
                            href={card.tcgplayer.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm transition-colors"
                          >
                            <ExternalLink size={15} />
                            在 TCGPlayer 查看购买
                          </a>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <DollarSign size={40} className="mx-auto mb-3 text-gray-300" />
                        <p className="text-gray-500 font-medium">暂无价格数据</p>
                        <p className="text-gray-400 text-sm mt-1">该卡牌暂时没有市场价格记录</p>
                      </div>
                    )}

                    {/* CardMarket prices */}
                    {card.cardmarket?.prices && (
                      <div className="border border-gray-200 rounded-xl overflow-hidden">
                        <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200 flex items-center justify-between">
                          <h4 className="font-bold text-gray-700 text-sm">欧洲市场 (CardMarket)</h4>
                          <span className="text-xs text-gray-400">€ 欧元</span>
                        </div>
                        <div className="p-4 grid grid-cols-2 gap-3">
                          {card.cardmarket.prices.averageSellPrice != null && (
                            <div>
                              <p className="text-xs text-gray-500">平均售价</p>
                              <p className="font-bold text-gray-800">€{card.cardmarket.prices.averageSellPrice?.toFixed(2)}</p>
                            </div>
                          )}
                          {card.cardmarket.prices.trendPrice != null && (
                            <div>
                              <p className="text-xs text-gray-500">趋势价</p>
                              <p className="font-bold text-blue-600">€{card.cardmarket.prices.trendPrice?.toFixed(2)}</p>
                            </div>
                          )}
                          {card.cardmarket.prices.lowPrice != null && (
                            <div>
                              <p className="text-xs text-gray-500">最低价</p>
                              <p className="font-bold text-green-600">€{card.cardmarket.prices.lowPrice?.toFixed(2)}</p>
                            </div>
                          )}
                          {card.cardmarket.prices.avg30 != null && (
                            <div>
                              <p className="text-xs text-gray-500">30日均价</p>
                              <p className="font-bold text-gray-700">€{card.cardmarket.prices.avg30?.toFixed(2)}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
      <p className="text-xs text-gray-400 mb-0.5">{icon} {label}</p>
      <p className="text-sm font-semibold text-gray-800 truncate">{value}</p>
    </div>
  );
}

function PriceCell({
  label, value, color, highlight
}: {
  label: string; value?: number; color: string; highlight?: boolean
}) {
  return (
    <div className={`p-3 text-center ${highlight ? 'bg-green-50' : ''}`}>
      <p className="text-[10px] text-gray-400 mb-1">{label}</p>
      <p className={`font-black text-sm ${color}`}>
        {value != null ? `$${value.toFixed(2)}` : '—'}
      </p>
    </div>
  );
}
