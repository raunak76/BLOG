import { createContext, useCallback, useContext, type ReactNode } from "react";
import { useLocalStorage } from "./use-local-storage";

type Store = Record<string, boolean>;

const BookmarkContext = createContext<{
  saved: string[];
  isSaved: (slug: string) => boolean;
  toggle: (slug: string) => void;
}>({ saved: [], isSaved: () => false, toggle: () => {} });

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const { value, setValue } = useLocalStorage<Store>("safesphere-bookmarks", {});

  const toggle = useCallback(
    (slug: string) => setValue((prev) => ({ ...prev, [slug]: !prev[slug] })),
    [setValue],
  );

  const saved = Object.keys(value).filter((k) => value[k]);

  return (
    <BookmarkContext.Provider value={{ saved, isSaved: (slug) => !!value[slug], toggle }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(BookmarkContext);
}
