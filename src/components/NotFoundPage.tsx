import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-cream)] px-6">
      <div className="text-center max-w-md">
        <div className="text-8xl font-serif text-[var(--color-royal-red)] mb-4">404</div>
        <h1 className="text-2xl font-serif text-[var(--color-ink)] mb-4">Wedding Not Found</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          The wedding site you're looking for doesn't exist or may have been removed.
        </p>
      </div>
    </div>
  );
}
