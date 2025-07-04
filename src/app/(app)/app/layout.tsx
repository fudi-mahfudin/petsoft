import AppFooter from '@/components/app-footer';
import AppHeader from '@/components/app-header';
import BackgroundPattern from '@/components/background-pattern';
import { Toaster } from '@/components/ui/sonner';
import { PetContextProvider } from '@/contexts/pet-context';
import { SearchContextProvider } from '@/contexts/search-context';
import { prismaDb } from '@/lib/db';
import { checkAuth } from '@/lib/utils-server';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await checkAuth();

  const pets = await prismaDb.pet.findMany({
    where: {
      userId: session.user.id || '',
    },
  });

  return (
    <>
      <BackgroundPattern />
      <div className="flex flex-col max-w-[1050px] mx-auto px-4 min-h-screen">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>
        <AppFooter />
      </div>

      <Toaster position="top-right" richColors />
    </>
  );
}
