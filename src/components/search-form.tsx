'use client';

import { useSearchContext } from '@/contexts/search-context';

export default function SearchForm() {
  const { handleChangeQuery, searchQuery } = useSearchContext();

  return (
    <form className="w-full h-full" onSubmit={(e) => e.preventDefault()}>
      <input
        type="search"
        className="w-full h-full bg-white/20 rounded-md px-5 outline-none transition focus:bg-white/50 hover:bg-white/30 placeholder:text-white/80"
        placeholder="Search pets"
        onChange={(e) => handleChangeQuery(e.target.value)}
        value={searchQuery}
      />
    </form>
  );
}
