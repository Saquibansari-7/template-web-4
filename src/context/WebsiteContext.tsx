/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useCallback, ReactNode } from "react";
import { loadContent, loadContentByCustomer } from "../services/loadContent";
import { saveContent, saveContentToSite } from "../services/saveContent";
import type { SiteRow } from "../lib/siteResolver";
import { DEFAULT_SITE_ID } from "../lib/supabase";

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
  visible: boolean;
}

export interface InfoItem {
  title: string;
  description: string;
  icon?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
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
  gallery: GalleryImage[];
  footerMessage: string;
  thingsToKnow: InfoItem[];
  adminPhone: string;
}

export const DEFAULT_WEDDING_DATA: WeddingData = {
  groomName: "Arjun",
  brideName: "Priya",
  weddingDate: "2026-12-20",
  weddingTime: "18:00",
  venueName: "Taj Palace",
  venueCity: "Jaipur",
  venueState: "Rajasthan",
  showGallery: true,
  emblem: "",
  invitationImage: "",
  gallery: [
    { id: 'g1', src: '/uploads/upload_1.png', alt: 'Pre-wedding photo 1' },
    { id: 'g2', src: '/uploads/upload_2.png', alt: 'Pre-wedding photo 2' },
    { id: 'g3', src: '/uploads/upload_3.png', alt: 'Pre-wedding photo 3' },
    { id: 'g4', src: '/uploads/wed-img-try.jpg', alt: 'Pre-wedding photo 4' },
    { id: 'g5', src: '/uploads/upload_1.png', alt: 'Pre-wedding photo 5' },
    { id: 'g6', src: '/uploads/upload_2.png', alt: 'Pre-wedding photo 6' },
  ],
  footerMessage: "With love from Arjun & Priya",
  adminPhone: "919876543210",
  thingsToKnow: [
    {
      title: 'Weather',
      description: 'December in Jaipur is pleasant with temperatures ranging from 10°C to 25°C. Evenings can be cool, so bring a light jacket.',
      icon: '☀️',
    },
    {
      title: 'Dress Code',
      description: 'Traditional Indian attire or formal evening wear. Jewel tones and gold accents are welcome. For Haldi, wear yellow or orange.',
      icon: '👗',
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
      date: 'December 18, 2026',
      time: '4:00 PM Onwards',
      venue: 'The Grand Haveli',
      address: 'Vaishali Nagar, Jaipur',
      mapLink: 'https://maps.google.com',
      description: 'An evening of traditional henna artistry, folk music, and celebration',
      visible: true,
    },
    {
      id: 'haldi',
      name: 'Haldi',
      nameHindi: 'हल्दी',
      date: 'December 19, 2026',
      time: '10:00 AM',
      venue: 'Royal Gardens',
      address: 'C-Scheme, Jaipur',
      mapLink: 'https://maps.google.com',
      description: 'Sacred turmeric ceremony with loved ones',
      visible: true,
    },
    {
      id: 'sangeet',
      name: 'Sangeet',
      nameHindi: 'संगीत',
      date: 'December 19, 2026',
      time: '7:00 PM Onwards',
      venue: 'Taj Palace Ballroom',
      address: 'Sansar Chandra Road, Jaipur',
      mapLink: 'https://maps.google.com',
      description: 'A night of music, dance, and celebration',
      visible: true,
    },
    {
      id: 'shaadi',
      name: 'Shaadi',
      nameHindi: 'शादी',
      date: 'December 20, 2026',
      time: '6:00 PM',
      venue: 'Taj Palace',
      address: 'Sansar Chandra Road, Jaipur',
      mapLink: 'https://maps.google.com',
      description: 'The royal union of two souls',
      visible: true,
    },
    {
      id: 'reception',
      name: 'Reception',
      nameHindi: 'रिसेप्शन',
      date: 'December 21, 2026',
      time: '7:30 PM',
      venue: 'The Grand Ballroom',
      address: 'MI Road, Jaipur',
      mapLink: 'https://maps.google.com',
      description: 'A night of celebration, dance, and feast',
      visible: true,
    },
  ],
};

export interface WebsiteContextType {
  weddingData: WeddingData;
  loading: boolean;
  updateWeddingData: (data: WeddingData) => void;
  saveWeddingData: (data: WeddingData) => Promise<{ error?: unknown }>;
  resetWeddingData: () => void;
  site?: SiteRow | null;
  notFound?: boolean;
}

export const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);

interface WebsiteProviderProps {
  children: ReactNode;
  siteId?: string;
}

export function WebsiteProvider({ children, siteId = DEFAULT_SITE_ID }: WebsiteProviderProps) {
  const [weddingData, setWeddingData] = useState<WeddingData>(DEFAULT_WEDDING_DATA);
  const [loading, setLoading] = useState(true);
  const [site, setSite] = useState<SiteRow | null>(null);
  const [notFound, setNotFound] = useState(false);

  const mergeWithDefaults = useCallback((data: WeddingData): WeddingData => ({
    ...DEFAULT_WEDDING_DATA,
    ...data,
    events: data.events && data.events.length ? data.events : DEFAULT_WEDDING_DATA.events,
    gallery: data.gallery && data.gallery.length ? data.gallery : DEFAULT_WEDDING_DATA.gallery,
    thingsToKnow: data.thingsToKnow && data.thingsToKnow.length ? data.thingsToKnow : DEFAULT_WEDDING_DATA.thingsToKnow,
  }), []);

  useEffect(() => {
    let active = true;
    
    const params = new URLSearchParams(window.location.search);
    const customer = params.get("customer");

    const load = async () => {
      try {
        if (customer && customer.trim()) {
          const result = await loadContentByCustomer(customer, DEFAULT_WEDDING_DATA);
          if (!active) return;
          if (result) {
            setWeddingData(result.content);
            setSite(result.site);
            setNotFound(false);
          } else {
            console.warn("[App] customer not found, showing 404");
            setNotFound(true);
          }
        } else {
          setNotFound(false);
          const data = await loadContent(siteId);
          if (!active) return;
          if (data) {
            setWeddingData(mergeWithDefaults(data));
          }
        }
      } catch (err) {
        console.error("[App] load failed:", err);
        try {
          const data = await loadContent(siteId);
          if (!active) return;
          if (data) {
            setWeddingData(mergeWithDefaults(data));
            setNotFound(false);
          }
        } catch (fallbackErr) {
          console.error("[App] fallback load failed:", fallbackErr);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [siteId, mergeWithDefaults]);

  const updateWeddingData = useCallback((data: WeddingData) => {
    setWeddingData(data);
  }, []);

  const saveWeddingData = useCallback(
    async (data: WeddingData) => {
      try {
        if (site) {
          const result = await saveContentToSite(site.id, data);
          return { error: result.error };
        }
        const result = await saveContent(siteId, data);
        return { error: result.error };
      } catch (err) {
        return { error: err };
      }
    },
    [siteId, site]
  );

  const resetWeddingData = useCallback(() => {
    setWeddingData(DEFAULT_WEDDING_DATA);
  }, []);

  return (
    <WebsiteContext.Provider
      value={{
        weddingData,
        loading,
        updateWeddingData,
        saveWeddingData,
        resetWeddingData,
        site,
        notFound,
      }}
    >
      {children}
    </WebsiteContext.Provider>
  );
}

export function useWebsiteContext() {
  const context = React.useContext(WebsiteContext);
  if (!context) {
    throw new Error("useWebsiteContext must be used within WebsiteProvider");
  }
  return context;
}
