import { Pet as _Pet } from '@prisma/client';

export type Pet = _Pet;
export type PetEssentials = Omit<_Pet, 'id' | 'createdAt' | 'updatedAt'>;
