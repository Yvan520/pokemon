import { useEffect } from 'react';

export function usePageMeta(title: string, description?: string, keywords?: string) {
  useEffect(() => {
    document.title = title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl && description) descEl.setAttribute('content', description);
    const kwEl = document.querySelector('meta[name="keywords"]');
    if (kwEl && keywords) kwEl.setAttribute('content', keywords);
  }, [title, description, keywords]);
}
