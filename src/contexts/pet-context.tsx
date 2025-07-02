'use client';

import { Pet } from '@/lib/types';
import { createContext, useContext, useState } from 'react';

type PetWithoutId = Omit<Pet, 'id'>

interface TPetContext {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | null;
  handleSelectPet: (id: string) => void;
  handleCheckoutPet: (id: string) => void;
  handleAddPet: (pet: PetWithoutId) => void;
  handleEditPet: (petId: string, pet: PetWithoutId) => void;
}

export const PetContext = createContext<TPetContext | null>(null);

export function PetContextProvider({
  data,
  children,
}: {
  data: Pet[];
  children: React.ReactNode;
}) {
  // state
  const [pets, setPets] = useState<Pet[]>(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId) || null;

  // event handlers / actions
  const handleSelectPet = (id: string) => {
    setSelectedPetId(id);
  };

  const handleCheckoutPet = (id: string) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
    setSelectedPetId(null);
  };

  const handleAddPet = (pet: PetWithoutId) => {
    const newPet = {
      id: Date.now().toString(),
      ...pet,
    };
    setPets((prev) => [...prev, newPet]);
    setSelectedPetId(newPet.id);
  };

  const handleEditPet = (petId: string, pet: PetWithoutId) => {
    setPets((prev) => prev.map((p) => (p.id === petId ? { ...pet, id: petId } : p)));
    setSelectedPetId(petId);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        handleSelectPet,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}

export function usePetContext() {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePetContext must be used within a PetContextProvider');
  }
  return context;
}
