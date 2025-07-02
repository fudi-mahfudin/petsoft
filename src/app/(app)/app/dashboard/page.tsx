import ContentBlock from '@/components/content-block';
import PetButton from '@/components/pet-button';
import PetDetails from '@/components/pet-details';
import PetList from '@/components/pet-list';
import SearchForm from '@/components/search-form';
import Stats from '@/components/stats';
import { H1 } from '@/components/typography';

export default function DashboadPage() {
  return (
    <main className="mb-5">
      <div className="flex items-center justify-between text-white py-8">
        <section>
          <H1>
            Pet <span className="font-semibold">Soft</span>
          </H1>
          <p className="text-lg opacity-80">
            Manage your pet daycare with ease
          </p>
        </section>

        <Stats />
      </div>

      <div className="grid grid-rows-[45px_300px_500px] gap-4 sm:grid-cols-3 sm:grid-rows-[45px_1fr] sm:h-[500px]">
        <SearchForm />

        <ContentBlock className="relative sm:col-start-1 sm:row-start-2">
          <PetList />

          <PetButton actionType="add" className="absolute bottom-4 right-4" />
        </ContentBlock>

        <ContentBlock className="sm:col-start-2 sm:row-start-1 sm:col-span-full sm:row-span-full">
          <PetDetails />
        </ContentBlock>
      </div>
    </main>
  );
}
