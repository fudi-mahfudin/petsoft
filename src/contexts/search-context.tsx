'use client';

import { createContext, useContext, useState } from 'react';

interface TSearchContext {
  searchQuery: string;
  handleChangeQuery: (value: string) => void;
}

export const SearchContext = createContext<TSearchContext | null>(null);

export function SearchContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // state
  const [searchQuery, setSearchQuery] = useState('');

  // derived state

  // event handlers / actions
  const handleChangeQuery = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        handleChangeQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchContext() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      'useSearchContext must be used within a SearchContextProvider'
    );
  }
  return context;
}
