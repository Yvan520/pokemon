export interface PokemonCard {
  id: string;
  name: string;
  supertype: string;
  subtypes?: string[];
  hp?: string;
  types?: string[];
  evolvesFrom?: string;
  evolvesTo?: string[];
  rules?: string[];
  abilities?: Ability[];
  attacks?: Attack[];
  weaknesses?: WeaknessResistance[];
  resistances?: WeaknessResistance[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  set: CardSet;
  number: string;
  artist?: string;
  rarity?: string;
  flavorText?: string;
  nationalPokedexNumbers?: number[];
  legalities?: Legalities;
  images: CardImages;
  tcgplayer?: TCGPlayer;
  cardmarket?: CardMarket;
}

export interface Ability {
  name: string;
  text: string;
  type: string;
}

export interface Attack {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

export interface WeaknessResistance {
  type: string;
  value: string;
}

export interface CardSet {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Legalities;
  ptcgoCode?: string;
  releaseDate: string;
  updatedAt: string;
  images: SetImages;
}

export interface Legalities {
  unlimited?: string;
  standard?: string;
  expanded?: string;
}

export interface CardImages {
  small: string;
  large: string;
}

export interface SetImages {
  symbol: string;
  logo: string;
}

export interface TCGPlayer {
  url: string;
  updatedAt: string;
  prices?: {
    holofoil?: PriceData;
    normal?: PriceData;
    reverseHolofoil?: PriceData;
    firstEditionHolofoil?: PriceData;
    firstEditionNormal?: PriceData;
  };
}

export interface PriceData {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow?: number;
}

export interface CardMarket {
  url: string;
  updatedAt: string;
  prices?: {
    averageSellPrice?: number;
    lowPrice?: number;
    trendPrice?: number;
    germanProLow?: number;
    suggestedPrice?: number;
    reverseHoloSell?: number;
    reverseHoloLow?: number;
    reverseHoloTrend?: number;
    lowPriceExPlus?: number;
    avg1?: number;
    avg7?: number;
    avg30?: number;
    reverseHoloAvg1?: number;
    reverseHoloAvg7?: number;
    reverseHoloAvg30?: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  page?: number;
  pageSize?: number;
  count?: number;
  totalCount?: number;
}

export interface SearchFilters {
  name: string;
  type: string;
  rarity: string;
  supertype: string;
  set: string;
}
