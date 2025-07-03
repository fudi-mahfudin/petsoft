'use client';

import { usePetContext } from '@/contexts/pet-context';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

interface Props {
  actionType: 'add' | 'edit';
  onFormSubmitted?: () => void;
}

export default function PetForm({ actionType, onFormSubmitted }: Props) {
  const { handleAddPet, handleEditPet, selectedPet } = usePetContext();
  const _selectedPet = actionType === 'edit' ? selectedPet : null;

  return (
    <form
      className="flex flex-col"
      action={async (formData) => {
        const petData = {
          name: formData.get('name') as string,
          ownerName: formData.get('ownerName') as string,
          imageUrl:
            (formData.get('imageUrl') as string) ||
            'https://placehold.co/45/png',
          age: Number(formData.get('age')),
          notes: formData.get('notes') as string,
        };

        onFormSubmitted?.();
        if (actionType === 'add') {
          handleAddPet(petData);
        } else {
          handleEditPet(selectedPet!.id, petData);
        }
      }}
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            defaultValue={_selectedPet?.name || ''}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            name="ownerName"
            defaultValue={_selectedPet?.ownerName || ''}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image Url</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            defaultValue={_selectedPet?.imageUrl || ''}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            step={1}
            defaultValue={_selectedPet?.age || ''}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={4}
            defaultValue={_selectedPet?.notes || ''}
          />
        </div>
      </div>
      <Button type="submit" className="mt-5 self-end rounded-full">
        {actionType === 'add' ? 'Add pet' : 'Save changes'}
      </Button>
    </form>
  );
}
