'use client';

import { addPet, deletePet, editPet } from '@/actions/pet-action';
import { Pet, PetEssentials } from '@/lib/types';
import { createContext, useContext, useOptimistic, useState } from 'react';
import { toast } from 'sonner';

interface TPetContext {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | null;
  handleSelectPet: (id: Pet['id']) => void;
  handleCheckoutPet: (id: Pet['id']) => void;
  handleAddPet: (pet: PetEssentials) => void;
  handleEditPet: (petId: Pet['id'], pet: PetEssentials) => void;
}

export const PetContext = createContext<TPetContext | null>(null);

export function PetContextProvider({
  data,
  children,
}: {
  data: Pet[];
  children: React.ReactNode;
}) {
  const [optimisticPets, setOptimisticPets] = useOptimistic<Pet[]>(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived state
  const selectedPet =
    optimisticPets.find((pet) => pet.id === selectedPetId) || null;

  // event handlers / actions
  const handleSelectPet = (id: Pet['id']) => {
    setSelectedPetId(id);
  };

  const handleCheckoutPet = async (id: Pet['id']) => {
    setOptimisticPets((prev) => prev.filter((p) => p.id !== id));
    setSelectedPetId(null);
    const result = await deletePet(id);

    if (result?.error) {
      toast.warning(result.error, { duration: Infinity });
    }
  };

  const handleAddPet = async (pet: PetEssentials) => {
    const newPet = {
      id: Date.now().toString(),
      ...pet,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setOptimisticPets((prev) => [...prev, newPet]);
    const result = await addPet(pet);

    if (result?.error) {
      toast.warning(result.error, { duration: Infinity });
    }
  };

  const handleEditPet = async (petId: Pet['id'], pet: PetEssentials) => {
    const updatedPet = {
      ...pet,
      id: petId,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    setOptimisticPets((prev) =>
      prev.map((p) => (p.id === petId ? updatedPet : p))
    );
    const result = await editPet(petId, pet);

    if (result?.error) {
      toast.warning(result.error, { duration: Infinity });
    }
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
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
