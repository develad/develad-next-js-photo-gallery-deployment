'use client';

import { useState, FormEvent, createRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Search() {
  const [search, setSearch] = useState('');
  const ref = createRef<HTMLInputElement>();
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/results/${search}`);
    ref.current?.blur();
    setSearch('');
  };
  return (
    <form
      className="flex justify-center md:justify-between w-9/12 sm:w-auto"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        ref={ref}
        className="bg-black text-white p-2 w-full sm:w-[280px] text-xl rounded-xl focus:border-green-300 border-4 border-white outline-none"
      />
    </form>
  );
}
