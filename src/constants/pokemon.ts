export const TYPE_COLORS: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  Fire:       { bg: 'bg-orange-500', text: 'text-orange-600', border: 'border-orange-300', badge: 'bg-orange-100 text-orange-700' },
  Water:      { bg: 'bg-blue-500',   text: 'text-blue-600',   border: 'border-blue-300',   badge: 'bg-blue-100 text-blue-700' },
  Grass:      { bg: 'bg-green-500',  text: 'text-green-600',  border: 'border-green-300',  badge: 'bg-green-100 text-green-700' },
  Lightning:  { bg: 'bg-yellow-400', text: 'text-yellow-600', border: 'border-yellow-300', badge: 'bg-yellow-100 text-yellow-700' },
  Psychic:    { bg: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-300', badge: 'bg-purple-100 text-purple-700' },
  Fighting:   { bg: 'bg-red-600',    text: 'text-red-600',    border: 'border-red-300',    badge: 'bg-red-100 text-red-700' },
  Darkness:   { bg: 'bg-gray-800',   text: 'text-gray-700',   border: 'border-gray-400',   badge: 'bg-gray-200 text-gray-800' },
  Metal:      { bg: 'bg-slate-500',  text: 'text-slate-600',  border: 'border-slate-300',  badge: 'bg-slate-100 text-slate-700' },
  Dragon:     { bg: 'bg-indigo-600', text: 'text-indigo-600', border: 'border-indigo-300', badge: 'bg-indigo-100 text-indigo-700' },
  Fairy:      { bg: 'bg-pink-400',   text: 'text-pink-600',   border: 'border-pink-300',   badge: 'bg-pink-100 text-pink-700' },
  Colorless:  { bg: 'bg-zinc-400',   text: 'text-zinc-600',   border: 'border-zinc-300',   badge: 'bg-zinc-100 text-zinc-700' },
};

export const TYPE_EMOJIS: Record<string, string> = {
  Fire: '🔥',
  Water: '💧',
  Grass: '🌿',
  Lightning: '⚡',
  Psychic: '🔮',
  Fighting: '👊',
  Darkness: '🌑',
  Metal: '⚙️',
  Dragon: '🐉',
  Fairy: '✨',
  Colorless: '⭐',
};

export const RARITY_COLORS: Record<string, string> = {
  'Common':                   'text-gray-500',
  'Uncommon':                 'text-green-600',
  'Rare':                     'text-blue-600',
  'Rare Holo':                'text-purple-600',
  'Rare Holo EX':             'text-purple-700',
  'Rare Holo GX':             'text-violet-600',
  'Rare Holo V':              'text-violet-700',
  'Rare Holo VMAX':           'text-fuchsia-600',
  'Rare Holo VSTAR':          'text-fuchsia-700',
  'Rare Ultra':               'text-amber-600',
  'Rare Secret':              'text-amber-700',
  'Rare Rainbow':             'text-rose-500',
  'Amazing Rare':             'text-cyan-600',
  'Illustration Rare':        'text-sky-600',
  'Special Illustration Rare':'text-sky-700',
  'Hyper Rare':               'text-yellow-500',
  'ACE SPEC Rare':            'text-orange-600',
};

export const RARITY_STARS: Record<string, string> = {
  'Common': '◆',
  'Uncommon': '◆◆',
  'Rare': '★',
  'Rare Holo': '★★',
  'Rare Holo EX': '★★',
  'Rare Holo GX': '★★',
  'Rare Holo V': '★★',
  'Rare Holo VMAX': '★★★',
  'Rare Holo VSTAR': '★★★',
  'Rare Ultra': '★★★',
  'Rare Secret': '★★★★',
  'Rare Rainbow': '★★★★',
  'Amazing Rare': '⬡',
  'Illustration Rare': '✦✦',
  'Special Illustration Rare': '✦✦✦',
  'Hyper Rare': '✦✦✦✦',
};

export const ENERGY_SYMBOLS: Record<string, string> = {
  R: '🔥', W: '💧', G: '🌿', L: '⚡', P: '🔮', F: '👊',
  D: '🌑', M: '⚙️', Y: '🐉', N: '✨', C: '⭐',
  Fire: '🔥', Water: '💧', Grass: '🌿', Lightning: '⚡',
  Psychic: '🔮', Fighting: '👊', Darkness: '🌑', Metal: '⚙️',
  Dragon: '🐉', Fairy: '✨', Colorless: '⭐',
};

export const POKEMON_TYPES = [
  'Fire', 'Water', 'Grass', 'Lightning', 'Psychic',
  'Fighting', 'Darkness', 'Metal', 'Dragon', 'Fairy', 'Colorless',
];

export const SUPERTYPE_LABELS: Record<string, string> = {
  Pokémon: '宝可梦',
  Trainer: '训练家',
  Energy: '能量',
};

export const FEATURED_SEARCHES = [
  { label: 'Charizard 喷火龙', query: 'name:"charizard"', emoji: '🔥' },
  { label: 'Pikachu 皮卡丘', query: 'name:"pikachu"', emoji: '⚡' },
  { label: 'Mewtwo 超梦', query: 'name:"mewtwo"', emoji: '🔮' },
  { label: 'Gardevoir 沙奈朵', query: 'name:"gardevoir"', emoji: '✨' },
  { label: 'Eevee 伊布', query: 'name:"eevee"', emoji: '💛' },
  { label: 'Rayquaza 烈空坐', query: 'name:"rayquaza"', emoji: '🐉' },
];
