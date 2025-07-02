import { H1 } from '@/components/typography';

export default function AccountPage() {
  return (
    <main className="mb-5">
      <div className="flex items-center justify-between text-white py-8">
        <section>
          <H1>Your account</H1>
          <p className="text-lg opacity-80">
            Manage your account settings
          </p>
        </section>
      </div>
    </main>
  );
}
