'use client';

import Image from 'next/image';
import { usePetContext } from '@/contexts/pet-context';
import { cn } from '@/lib/utils';
import { useSearchContext } from '@/contexts/search-context';

export default function PetList() {
  const { pets, handleSelectPet, selectedPetId } = usePetContext();
  const { searchQuery } = useSearchContext();

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ul className="bg-white border-b border-light">
      {filteredPets.map((pet) => (
        <li key={pet.id}>
          <button
            onClick={() => handleSelectPet(pet.id)}
            className={cn(
              'flex items-center gap-3 h-[70px] w-full cursor-pointer px-5 text-base hover:bg-custom-50 focus:bg-custom-50 transition',
              {
                'bg-custom-50': selectedPetId === pet.id,
              }
            )}
          >
            <Image
              src={pet.imageUrl}
              alt="Pet image"
              width={44}
              height={44}
              className="rounded-full object-cover w-11 h-11"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
