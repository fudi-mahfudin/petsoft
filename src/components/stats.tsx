'use client';

import { usePetContext } from '@/contexts/pet-context';

export default function Stats() {
  const { pets } = usePetContext();
  const numberOfPets = pets.length || 0;

  return (
    <section className="text-center">
      <p className="text-2xl font-bold leading-6">{numberOfPets}</p>
      <p className="opacity-80">current guests</p>
    </section>
  );
}
