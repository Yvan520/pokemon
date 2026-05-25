import { useState, useEffect, useCallback } from 'react';
import { PokemonCard } from '../types/pokemon';
import { searchCards, buildQuery } from '../api/pokemonTCG';

interface UseCardsOptions {
  initialQuery?: string;
  pageSize?: number;
}

export function usePokemonCards({ initialQuery = '', pageSize = 20 }: UseCardsOptions = {}) {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [query, setQuery] = useState(initialQuery);

  const fetch = useCallback(async (q: string, p: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await searchCards(q, p, pageSize);
      setCards(res.data || []);
      setTotalCount(res.totalCount || 0);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    fetch(query, page);
  }, [query, page, fetch]);

  const search = useCallback((filters: {
    name?: string;
    type?: string;
    rarity?: string;
    supertype?: string;
    set?: string;
  }) => {
    const q = buildQuery(filters);
    setQuery(q);
    setPage(1);
  }, []);

  const goToPage = useCallback((p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return {
    cards,
    loading,
    error,
    page,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    query,
    search,
    goToPage,
  };
}
