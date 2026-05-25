import { PokemonCard, CardSet, ApiResponse } from '../types/pokemon';

const BASE_URL = 'https://api.pokemontcg.io/v2';

// Optional: set your API key here for higher rate limits
// const API_KEY = 'your-api-key';
const HEADERS: HeadersInit = {
  // 'X-Api-Key': API_KEY,
};

async function apiFetch<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v) url.searchParams.set(k, v);
    });
  }
  const res = await fetch(url.toString(), { headers: HEADERS });
  if (!res.ok) throw new Error(`API Error ${res.status}: ${res.statusText}`);
  return res.json();
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
  return apiFetch<ApiResponse<PokemonCard[]>>('/cards', params);
}

export async function getCard(id: string): Promise<{ data: PokemonCard }> {
  return apiFetch<{ data: PokemonCard }>(`/cards/${id}`);
}

export async function getSets(): Promise<ApiResponse<CardSet[]>> {
  return apiFetch<ApiResponse<CardSet[]>>('/sets', { orderBy: '-releaseDate' });
}

export async function getSet(id: string): Promise<{ data: CardSet }> {
  return apiFetch<{ data: CardSet }>(`/sets/${id}`);
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
}): string {
  const parts: string[] = [];
  if (filters.name) parts.push(`name:"${filters.name}*"`);
  if (filters.type) parts.push(`types:${filters.type}`);
  if (filters.rarity) parts.push(`rarity:"${filters.rarity}"`);
  if (filters.supertype) parts.push(`supertype:${filters.supertype}`);
  if (filters.set) parts.push(`set.name:"${filters.set}*"`);
  return parts.join(' ');
}
