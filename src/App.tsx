import { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import EventsSection from './components/EventsSection';
import GallerySection from './components/GallerySection';
import ThingsToKnowSection from './components/ThingsToKnowSection';
import CountdownSection from './components/CountdownSection';
import RSVPSection from './components/RSVPSection';
import Footer from './components/Footer';
import AdminEditModal from './components/AdminEditModal';
import { Settings } from 'lucide-react';

export interface EventData {
  id: string;
  name: string;
  nameHindi: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapLink: string;
  description: string;
  // icon: string;
}

export interface InfoItem {
  title: string;
  description: string;
  icon?: string;
}

export interface WeddingData {
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime: string;
  venueName: string;
  venueCity: string;
  venueState: string;
  showGallery: boolean;
  emblem: string;
  invitationImage: string;
  events: EventData[];
  footerMessage: string;
  thingsToKnow: InfoItem[];
  adminPhone: string;
}

const DEFAULT_WEDDING_DATA: WeddingData = {
  groomName: 'Arjun',
  brideName: 'Priya',
  weddingDate: '2024-12-20',
  weddingTime: '18:00',
  venueName: 'Taj Palace',
  venueCity: 'Jaipur',
  venueState: 'Rajasthan',
  showGallery: true,
  emblem: '',
  invitationImage: '',
  footerMessage: 'With love from Arjun & Priya',
  adminPhone: '919876543210',
  thingsToKnow: [
    {
      title: 'Weather',
      description: 'December in Jaipur is pleasant with temperatures ranging from 10°C to 25°C. Evenings can be cool, so bring a light jacket.',
      icon: '☀️',
    },
    {
      title: 'Dress Code',
      description: 'Traditional Indian attire or formal evening wear. Jewel tones and gold accents are welcome. For Haldi, wear yellow or orange.',
      icon: '🟡',
    },
    {
      title: 'Accommodation',
      description: 'Complimentary accommodation arranged for out-of-town guests at partner hotels. Contact us for booking details.',
      icon: '🏨',
    },
    {
      title: 'Contact',
      description: 'For any queries, reach out to the families:\nBride: +91 98765 43210\nGroom: +91 98765 43211',
      icon: '📞',
    },
    {
      title: 'Transportation',
      description: 'Complimentary shuttle service available from major hotels to all venues. Schedule will be shared closer to the dates.',
      icon: '🚗',
    },
    {
      title: 'Gifts',
      description: 'Your presence is our greatest gift. If you wish to bless the couple, a contribution to their future home would be appreciated.',
      icon: '🎁',
    },
  ],
  events: [
    {
      id: 'mehendi',
      name: 'Mehendi',
      nameHindi: 'मेहंदी',
      date: 'December 18, 2024',
      time: '4:00 PM Onwards',
      venue: 'The Grand Haveli',
      address: 'Vaishali Nagar, Jaipur',
      mapLink: 'https://maps.google.com',
      description: 'An evening of traditional henna artistry, folk music, and celebration',

    },
    {
      id: 'haldi',
      name: 'Haldi',
      nameHindi: 'हल्दी',
      date: 'December 19, 2024',
      time: '10:00 AM',
      venue: 'Royal Gardens',
      address: 'C-Scheme, Jaipur',
      mapLink: 'https://maps.google.com',
      description: 'Sacred turmeric ceremony with loved ones',

    },
    {
      id: 'sangeet',
      name: 'Sangeet',
      nameHindi: 'संगीत',
      date: 'December 19, 2024',
      time: '7:00 PM Onwards',
      venue: 'Taj Palace Ballroom',
      address: 'Sansar Chandra Road, Jaipur',
      mapLink: 'https://maps.google.com',
      description: 'A night of music, dance, and celebration',

    },
    {
      id: 'shaadi',
      name: 'Shaadi',
      nameHindi: 'शादी',
      date: 'December 20, 2024',
      time: '6:00 PM',
      venue: 'Taj Palace',
      address: 'Sansar Chandra Road, Jaipur',
      mapLink: 'https://maps.google.com',
      description: 'The royal union of two souls',

    },
    {
      id: 'reception',
      name: 'Reception',
      nameHindi: 'रिसेप्शन',
      date: 'December 21, 2024',
      time: '7:30 PM',
      venue: 'The Grand Ballroom',
      address: 'MI Road, Jaipur',
      mapLink: 'https://maps.google.com',
      description: 'A night of celebration, dance, and feast',

    },
  ],
};

function App() {
  const [weddingData, setWeddingData] = useState<WeddingData>(() => {
    const saved = localStorage.getItem('weddingData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Data Migration: Ensure new fields exist for users with old saved data
        if (!parsed.events || typeof parsed.showGallery === 'undefined' || !parsed.emblem || !parsed.invitationImage || !parsed.thingsToKnow || !parsed.adminPhone) {
          return {
            ...DEFAULT_WEDDING_DATA,
            ...parsed,
            events: parsed.events || DEFAULT_WEDDING_DATA.events,
            showGallery: typeof parsed.showGallery !== 'undefined' ? parsed.showGallery : DEFAULT_WEDDING_DATA.showGallery,
            emblem: parsed.emblem || DEFAULT_WEDDING_DATA.emblem,
            invitationImage: parsed.invitationImage || DEFAULT_WEDDING_DATA.invitationImage,
            thingsToKnow: parsed.thingsToKnow || DEFAULT_WEDDING_DATA.thingsToKnow,
            adminPhone: parsed.adminPhone || DEFAULT_WEDDING_DATA.adminPhone
          };
        }
        // Remove icons from events
        const eventsWithoutIcons = parsed.events.map((event: any) => ({ ...event, icon: undefined }));
        return { ...parsed, events: eventsWithoutIcons };
      } catch (e) {
        return DEFAULT_WEDDING_DATA;
      }
    }
    return DEFAULT_WEDDING_DATA;
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setShowPasswordModal(true);
    }
  }, []);

  const handleUpdateWeddingData = (newData: WeddingData) => {
    setWeddingData(newData);
    localStorage.setItem('weddingData', JSON.stringify(newData));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAdmin(true);
      setShowPasswordModal(false);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--color-cream)]">
      {/* Admin Edit Button */}
      {isAdmin && (
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-[var(--color-royal-red)] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group"
          title="Admin Edit"
        >
          <Settings className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
        </button>
      )}

      {/* Navigation removed as per request */}

      <main>
        <HeroSection weddingData={weddingData} />
        <EventsSection weddingData={weddingData} />
        {weddingData.showGallery && <GallerySection />}
        <ThingsToKnowSection thingsToKnow={weddingData.thingsToKnow} />
        <CountdownSection weddingDate={weddingData.weddingDate} weddingTime={weddingData.weddingTime} />
        <RSVPSection adminPhone={weddingData.adminPhone} />
      </main>
      <Footer footerDate={weddingData.weddingDate} footerMessage={weddingData.footerMessage} />

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
          onSave={handleUpdateWeddingData}
        />
      )}
    </div>
  );
}

export default App;
