import { useState, useCallback } from 'react';

const STORAGE_KEY = 'pokedex_ratings';

type Ratings = Record<string, number>;

function loadRatings(): Ratings {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveRatings(r: Ratings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(r));
}

export function useCardRatings() {
  const [ratings, setRatings] = useState<Ratings>(loadRatings);

  const setRating = useCallback((cardId: string, score: number) => {
    setRatings(prev => {
      const next = { ...prev, [cardId]: score };
      saveRatings(next);
      return next;
    });
  }, []);

  const getRating = useCallback((cardId: string): number | null => {
    return ratings[cardId] ?? null;
  }, [ratings]);

  const averageRating = useCallback((ids: string[]): number | null => {
    const vals = ids.map(id => ratings[id]).filter((v): v is number => v != null);
    if (vals.length === 0) return null;
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  }, [ratings]);

  return { ratings, setRating, getRating, averageRating };
}
