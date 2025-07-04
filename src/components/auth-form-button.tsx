import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

export default function AuthFormButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();

  return (
    <Button className="rounded-full" disabled={pending}>
      {children}
      {pending && '...'}
    </Button>
  );
}
