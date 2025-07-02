import { cn } from '@/lib/utils';

export default function ContentBlock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'bg-custom-10 shadow-sm rounded-md overflow-hidden h-full w-full',
        className
      )}
    >
      {children}
    </div>
  );
}
