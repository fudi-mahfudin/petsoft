'use server';

import { prismaDb } from '@/lib/db';
import { errorChance, sleep } from '@/lib/utils';
import { petIdSchema, petSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';
import { checkAuth } from '@/lib/utils-server';

export async function addPet(pet: unknown) {
  await sleep(2000);

  // authentication check (user is logged in)
  const session = await checkAuth();

  // validation
  const validatedPet = petSchema.safeParse(pet);
  if (!validatedPet.success) {
    return { error: 'Invalid pet data' };
  }

  // database mutation
  try {
    errorChance(0.1);
    await prismaDb.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
    return { error: 'Failed to add pet' };
  }

  revalidatePath('/app', 'layout');
  return { success: 'Pet added successfully' };
}

export async function editPet(petId: unknown, petData: unknown) {
  await sleep(2000);

  // authentication check (user is logged in)
  const session = await checkAuth();
  // validation
  const validatedPetId = petIdSchema.safeParse(petId);
  const validatedPetData = petSchema.safeParse(petData);
  if (!validatedPetId.success || !validatedPetData.success) {
    return { error: 'Invalid pet data' };
  }

  // authorization check (user owns pet)
  const pet = await prismaDb.pet.findUnique({
    where: { id: validatedPetId.data },
  });
  if (pet?.userId !== session.user.id) {
    return { error: 'You do not have permission to edit this pet' };
  }

  // database mutation
  try {
    errorChance(0.1);
    await prismaDb.pet.update({
      where: { id: validatedPetId.data },
      data: {
        ...validatedPetData.data,
      },
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

  // authentication check (user is logged in)
  const session = await checkAuth();
  // validation
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return { error: 'Invalid pet data' };
  }

  // authorization check (user owns pet)
  const pet = await prismaDb.pet.findUnique({
    where: { id: validatedPetId.data },
  });
  if (pet?.userId !== session.user.id) {
    return { error: 'You do not have permission to delete this pet' };
  }

  // database mutation
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
