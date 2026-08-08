import { useState } from 'react';
import HeroSection from './components/HeroSection';
import EventsSection from './components/EventsSection';
import GallerySection from './components/GallerySection';
import ThingsToKnowSection from './components/ThingsToKnowSection';
import CountdownSection from './components/CountdownSection';
import RSVPSection from './components/RSVPSection';
import Footer from './components/Footer';
import AdminEditModal from './components/AdminEditModal';
import { ScrollProgress, Petals } from './components/Decor';
import CurtainIntro from './components/CurtainIntro';
import MusicPlayer from './components/MusicPlayer';
import { WebsiteProvider, useWebsiteContext, DEFAULT_WEDDING_DATA } from './context/WebsiteContext';
import type { WeddingData, EventData, InfoItem, GalleryImage } from './context/WebsiteContext';

export type { WeddingData, EventData, InfoItem, GalleryImage };
export { DEFAULT_WEDDING_DATA };

function SiteApp() {
  const { weddingData, updateWeddingData, saveWeddingData, resetWeddingData } = useWebsiteContext();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(() => window.location.pathname === '/admin');
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveAndPersist = async (newData: WeddingData) => {
    updateWeddingData(newData);
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);
    const { error } = await saveWeddingData(newData);
    setSaving(false);
    if (error) {
      setSaveError('Failed to save to Supabase. Check your connection and env keys.');
    } else {
      setSaveSuccess(true);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsEditModalOpen(true);
      setShowPasswordModal(false);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--color-cream)]">
      <ScrollProgress />
      <CurtainIntro />
      <MusicPlayer />
      {/* Global petal flow across the whole site */}
      <div className="fixed inset-0 z-30 pointer-events-none opacity-80">
        <Petals count={18} />
      </div>

      {/* Navigation removed as per request */}

      <main>
        <HeroSection weddingData={weddingData} />
        <CountdownSection weddingDate={weddingData.weddingDate} weddingTime={weddingData.weddingTime} />
        <EventsSection weddingData={weddingData} />
        {weddingData.showGallery && <GallerySection gallery={weddingData.gallery} />}
        <ThingsToKnowSection thingsToKnow={weddingData.thingsToKnow} />
        <RSVPSection adminPhone={weddingData.adminPhone} />
      </main>
      <Footer
        footerDate={weddingData.weddingDate}
        footerMessage={weddingData.footerMessage}
        groomName={weddingData.groomName}
        brideName={weddingData.brideName}
      />

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowPasswordModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-serif text-center text-[var(--color-royal-red)] mb-6">Admin Access</h2>
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold uppercase tracking-wider text-[var(--color-ink)]/50 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-royal-red)]"
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-400 hover:text-gray-600 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[var(--color-royal-red)] text-white py-3 px-6 rounded-xl hover:bg-[var(--color-royal-red)]/90 transition-all font-bold"
                >
                  Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <AdminEditModal
          data={weddingData}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveAndPersist}
          onReset={resetWeddingData}
          saving={saving}
          saveError={saveError}
          saveSuccess={saveSuccess}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <WebsiteProvider>
      <SiteApp />
    </WebsiteProvider>
  );
}


