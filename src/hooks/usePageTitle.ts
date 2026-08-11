import { useEffect } from 'react';

export function usePageTitle(title: string | null) {
  useEffect(() => {
    if (!title) return;
    const previousTitle = document.title;
    document.title = title;
    
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}
