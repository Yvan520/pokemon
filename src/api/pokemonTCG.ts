import { PokemonCard, CardSet, ApiResponse } from '../types/pokemon';

const BASE_URL = 'https://api.pokemontcg.io/v2';
const CACHE_PREFIX = 'ptcg_cache_';
const CACHE_TTL: Record<string, number> = {
  card: 30 * 60 * 1000,
  search: 5 * 60 * 1000,
  sets: 60 * 60 * 1000,
};

function getCacheKey(url: string): string {
  return CACHE_PREFIX + url;
}

function cacheGet<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { data, expiry } = JSON.parse(raw);
    if (Date.now() > expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return data as T;
  } catch {
    return null;
  }
}

function cacheSet(key: string, data: unknown, ttl: number) {
  try {
    localStorage.setItem(key, JSON.stringify({ data, expiry: Date.now() + ttl }));
  } catch {
    // localStorage full — silently ignore
  }
}

async function apiFetch<T>(path: string, params?: Record<string, string>, ttl?: number): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v) url.searchParams.set(k, v);
    });
  }
  const urlStr = url.toString();
  const cacheKey = getCacheKey(urlStr);

  if (ttl) {
    const cached = cacheGet<T>(cacheKey);
    if (cached) return cached;
  }

  const res = await fetch(urlStr);
  if (!res.ok) throw new Error(`API Error ${res.status}: ${res.statusText}`);
  const json = await res.json();

  if (ttl) cacheSet(cacheKey, json, ttl);
  return json;
}

export async function searchCards(
  query: string = '',
  page: number = 1,
  pageSize: number = 20,
  orderBy: string = '-set.releaseDate'
): Promise<ApiResponse<PokemonCard[]>> {
  const params: Record<string, string> = {
    page: String(page),
    pageSize: String(pageSize),
    orderBy,
  };
  if (query) params.q = query;
  return apiFetch<ApiResponse<PokemonCard[]>>('/cards', params, CACHE_TTL.search);
}

export async function getCard(id: string): Promise<{ data: PokemonCard }> {
  return apiFetch<{ data: PokemonCard }>(`/cards/${id}`, undefined, CACHE_TTL.card);
}

export async function getSets(): Promise<ApiResponse<CardSet[]>> {
  return apiFetch<ApiResponse<CardSet[]>>('/sets', { orderBy: '-releaseDate' }, CACHE_TTL.sets);
}

export async function getSet(id: string): Promise<{ data: CardSet }> {
  return apiFetch<{ data: CardSet }>(`/sets/${id}`, undefined, CACHE_TTL.card);
}

export async function getTypes(): Promise<{ data: string[] }> {
  return apiFetch<{ data: string[] }>('/types');
}

export async function getRarities(): Promise<{ data: string[] }> {
  return apiFetch<{ data: string[] }>('/rarities');
}

export async function getSubtypes(): Promise<{ data: string[] }> {
  return apiFetch<{ data: string[] }>('/subtypes');
}

export function buildQuery(filters: {
  name?: string;
  type?: string;
  rarity?: string;
  supertype?: string;
  set?: string;
  setId?: string;
}): string {
  const parts: string[] = [];
  if (filters.name) parts.push(`name:"${filters.name}*"`);
  if (filters.type) parts.push(`types:${filters.type}`);
  if (filters.rarity) parts.push(`rarity:"${filters.rarity}"`);
  if (filters.supertype) parts.push(`supertype:${filters.supertype}`);
  if (filters.setId) parts.push(`set.id:${filters.setId}`);
  if (filters.set && !filters.setId) parts.push(`set.name:"${filters.set}*"`);
  return parts.join(' ');
}
