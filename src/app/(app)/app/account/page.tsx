import ContentBlock from '@/components/content-block';
import SignoutButton from '@/components/signout-button';
import { H1 } from '@/components/typography';
import { checkAuth } from '@/lib/utils-server';

export default async function AccountPage() {
  const session = await checkAuth();

  return (
    <main className="mb-5">
      <div className="flex items-center justify-between text-white py-8">
        <section>
          <H1>Your account</H1>
          <p className="text-lg opacity-80">Manage your account settings</p>
        </section>
      </div>
      <ContentBlock className="flex flex-col items-center justify-center gap-5 h-[400px]">
        <p>Logged in as {session?.user?.email}</p>
        <SignoutButton />
      </ContentBlock>
    </main>
  );
}
