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
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/"
            className="btn-royal inline-flex items-center justify-center gap-2 py-3 px-6 text-sm"
          >
            <Home className="w-4 h-4" />
            Go Home
          </a>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 py-3 px-6 border-2 border-gray-200 text-gray-500 hover:text-[var(--color-ink)] hover:border-[var(--color-royal-gold)] rounded-full transition-all text-sm font-bold uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
