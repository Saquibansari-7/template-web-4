import { useState } from 'react';
import HeroSection from './components/HeroSection';
import EventsSection from './components/EventsSection';
import GallerySection from './components/GallerySection';
import ThingsToKnowSection from './components/ThingsToKnowSection';
import CountdownSection from './components/CountdownSection';
import RSVPSection from './components/RSVPSection';
import Footer from './components/Footer';
import AdminEditModal from './components/AdminEditModal';
import AdminPasswordGate from './components/admin-password-gate/AdminPasswordGate';
import NotFoundPage from './components/NotFoundPage';
import { ScrollProgress, Petals } from './components/Decor';
import CurtainIntro from './components/CurtainIntro';
import MusicPlayer from './components/MusicPlayer';
import LanguageToggle from './components/LanguageToggle';
import { WebsiteProvider, useWebsiteContext, DEFAULT_WEDDING_DATA } from './context/WebsiteContext';
import { DEFAULT_SITE_ID } from './lib/supabase';
import { LanguageProvider } from './context/LanguageContext';
import type { WeddingData, EventData, InfoItem, GalleryImage } from './context/WebsiteContext';

export type { WeddingData, EventData, InfoItem, GalleryImage };
export { DEFAULT_WEDDING_DATA };

function SiteApp() {
  const { weddingData, updateWeddingData, saveWeddingData, resetWeddingData, site, notFound } = useWebsiteContext();

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const customer = new URLSearchParams(window.location.search).get('customer') || '';
  const isAdmin = window.location.pathname === '/admin';

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

  const viewSiteHref = customer
    ? `/?customer=${encodeURIComponent(customer)}`
    : '/';

  if (notFound) {
    return <NotFoundPage />;
  }

  if (isAdmin) {
    return (
      <AdminPasswordGate customer={customer || 'default'}>
        <AdminEditModal
          data={weddingData}
          onClose={() => {}}
          onSave={handleSaveAndPersist}
          onReset={resetWeddingData}
          onResetPassword={() => {
            localStorage.removeItem(`admin_pass_${customer || 'default'}`);
            window.location.reload();
          }}
          viewSiteHref={viewSiteHref}
          saving={saving}
          saveError={saveError}
          saveSuccess={saveSuccess}
          siteId={site?.id || DEFAULT_SITE_ID}
        />
      </AdminPasswordGate>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--color-cream)]">
      <LanguageToggle />
      <ScrollProgress />
      <CurtainIntro />
      <MusicPlayer />
      <div className="fixed inset-0 z-30 pointer-events-none opacity-80">
        <Petals count={18} />
      </div>

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
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <WebsiteProvider>
        <SiteApp />
      </WebsiteProvider>
    </LanguageProvider>
  );
}