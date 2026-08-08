import type { WeddingData } from '../context/WebsiteContext';
import { DEFAULT_WEDDING_DATA } from '../context/WebsiteContext';

export function normalizeWeddingData(data: Partial<WeddingData> | null | undefined): WeddingData {
  if (!data) return DEFAULT_WEDDING_DATA;
  return {
    ...DEFAULT_WEDDING_DATA,
    ...data,
    events: data.events && data.events.length ? data.events : DEFAULT_WEDDING_DATA.events,
    gallery: data.gallery && data.gallery.length ? data.gallery : DEFAULT_WEDDING_DATA.gallery,
    thingsToKnow: data.thingsToKnow && data.thingsToKnow.length ? data.thingsToKnow : DEFAULT_WEDDING_DATA.thingsToKnow,
  };
}
