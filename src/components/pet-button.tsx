'use client';

import { PlusIcon } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import PetForm from './pet-form';
import { useState } from 'react';
import { flushSync } from 'react-dom';

interface Props {
  actionType: 'add' | 'edit' | 'checkout';
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function PetButton({
  actionType,
  disabled,
  className,
  onClick,
}: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  if (actionType === 'checkout') {
    return (
      <Button
        variant="secondary"
        className={cn('rounded-full', className)}
        onClick={onClick}
        disabled={disabled}
      >
        Checkout
      </Button>
    );
  }

  const title = actionType === 'add' ? 'Add a new pet' : 'Edit pet';

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogTrigger asChild>
        {actionType === 'add' ? (
          <Button size="icon" className={cn('rounded-full', className)}>
            <PlusIcon />
          </Button>
        ) : (
          <Button variant="secondary" className={cn('rounded-full', className)}>
            Edit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="sr-only">{title}</DialogDescription>
        </DialogHeader>
        <PetForm
          actionType={actionType}
          onFormSubmitted={() => {
            flushSync(() => setIsFormOpen(false));
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
