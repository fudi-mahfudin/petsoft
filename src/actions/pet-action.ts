'use server';

import { prismaDb } from '@/lib/db';
import { errorChance, sleep } from '@/lib/utils';
import { petIdSchema, petSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

export async function addPet(pet: unknown) {
  await sleep(2000);

  const validatedPet = petSchema.safeParse(pet);
  if (!validatedPet.success) {
    return { error: 'Invalid pet data' };
  }

  try {
    errorChance(0.1);
    await prismaDb.pet.create({
      data: validatedPet.data,
    });
  } catch (err) {
    console.error(err);
    return { error: 'Failed to add pet' };
  }

  revalidatePath('/app', 'layout');
  return { success: 'Pet added successfully' };
}

export async function editPet(petId: unknown, pet: unknown) {
  await sleep(2000);

  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPet = petSchema.safeParse(pet);
  if (!validatedPetId.success || !validatedPet.success) {
    return { error: 'Invalid pet data' };
  }

  try {
    errorChance(0.1);
    await prismaDb.pet.update({
      where: { id: validatedPetId.data },
      data: validatedPet.data,
    });
  } catch (err) {
    console.error(err);
    return { error: 'Failed to edit pet' };
  }

  revalidatePath('/app', 'layout');
  return { success: 'Pet edited successfully' };
}

export async function deletePet(petId: unknown) {
  await sleep(2000);

  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return { error: 'Invalid pet data' };
  }

  try {
    errorChance(0.1);
    await prismaDb.pet.delete({
      where: { id: validatedPetId.data },
    });
  } catch (err) {
    console.error(err);
    return { error: 'Failed to delete pet' };
  }

  revalidatePath('/app', 'layout');
  return { success: 'Pet deleted successfully' };
}
