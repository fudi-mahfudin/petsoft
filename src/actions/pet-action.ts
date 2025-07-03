'use server';

import { prismaDb } from '@/lib/db';
import { PetEssentials } from '@/lib/types';
import { errorChance, sleep } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export async function addPet(pet: PetEssentials) {
  await sleep(2000);

  try {
    errorChance(0.1);
    await prismaDb.pet.create({
      data: pet,
    });
  } catch (err) {
    console.error(err);
    return { error: 'Failed to add pet' };
  }

  revalidatePath('/app', 'layout');
  return { success: 'Pet added successfully' };
}

export async function editPet(petId: string, pet: PetEssentials) {
  await sleep(2000);

  try {
    errorChance(0.1);
    await prismaDb.pet.update({
      where: { id: petId },
      data: pet,
    });
  } catch (err) {
    console.error(err);
    return { error: 'Failed to edit pet' };
  }

  revalidatePath('/app', 'layout');
  return { success: 'Pet edited successfully' };
}

export async function deletePet(petId: string) {
  await sleep(2000);

  try {
    errorChance(0.1);
    await prismaDb.pet.delete({
      where: { id: petId },
    });
  } catch (err) {
    console.error(err);
    return { error: 'Failed to delete pet' };
  }

  revalidatePath('/app', 'layout');
  return { success: 'Pet deleted successfully' };
}
