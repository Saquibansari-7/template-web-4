import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Trash2, Calendar, Layout, Info, Upload, Image } from 'lucide-react';
import { WeddingData } from '../App';

interface AdminEditModalProps {
  data: WeddingData;
  onClose: () => void;
  onSave: (newData: WeddingData) => void;
}

export default function AdminEditModal({ data, onClose, onSave }: AdminEditModalProps) {
  const [formData, setFormData] = useState<WeddingData>({
    ...data,
    events: data.events || [],
    emblem: data.emblem || '',
    invitationImage: data.invitationImage || '',
    thingsToKnow: data.thingsToKnow || []
  });
  const [activeTab, setActiveTab] = useState<'general' | 'events' | 'info'>('general');
  const [emblemPreview, setEmblemPreview] = useState<string>(data.emblem || '');
  const [invitationPreview, setInvitationPreview] = useState<string>(data.invitationImage || '');
  const [isHoveringEmblem, setIsHoveringEmblem] = useState(false);
  const [isHoveringInvitation, setIsHoveringInvitation] = useState(false);
  const emblemInputRef = useRef<HTMLInputElement>(null);
  const invitationInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleEmblemUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setEmblemPreview(base64);
        setFormData(prev => ({ ...prev, emblem: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveEmblem = () => {
    setEmblemPreview('');
    setFormData(prev => ({ ...prev, emblem: '' }));
    if (emblemInputRef.current) {
      emblemInputRef.current.value = '';
    }
  };

  const handleInvitationUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setInvitationPreview(base64);
        setFormData(prev => ({ ...prev, invitationImage: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveInvitation = () => {
    setInvitationPreview('');
    setFormData(prev => ({ ...prev, invitationImage: '' }));
    if (invitationInputRef.current) {
      invitationInputRef.current.value = '';
    }
  };

  const handleEventChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedEvents = [...formData.events];
    updatedEvents[index] = { ...updatedEvents[index], [name]: value };
    setFormData((prev) => ({ ...prev, events: updatedEvents }));
  };

  const handleInfoChange = (index: number, field: 'title' | 'description' | 'icon', value: string) => {
    const updatedInfo = [...formData.thingsToKnow];
    updatedInfo[index] = { ...updatedInfo[index], [field]: value };
    setFormData((prev) => ({ ...prev, thingsToKnow: updatedInfo }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to default values?')) {
      localStorage.removeItem('weddingData');
      window.location.reload();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[var(--color-royal-gold)]/20 flex flex-col h-[90vh]"
        >
          {/* Header */}
          <div className="bg-[var(--color-royal-red)] p-6 flex items-center justify-between flex-shrink-0">
            <div>
              <h2 className="text-white font-serif text-2xl">Wedding Control Center</h2>
              <p className="text-white/60 text-xs uppercase tracking-widest mt-1">Admin Panel</p>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[var(--color-surface-low)] bg-gray-50 flex-shrink-0">
            <button
              onClick={() => setActiveTab('general')}
              className={`flex-1 py-4 flex items-center justify-center gap-2 text-sm font-bold tracking-wider uppercase transition-all ${activeTab === 'general' ? 'text-[var(--color-royal-red)] bg-white border-b-2 border-[var(--color-royal-red)]' : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              <Info className="w-4 h-4" />
              General Info
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`flex-1 py-4 flex items-center justify-center gap-2 text-sm font-bold tracking-wider uppercase transition-all ${activeTab === 'events' ? 'text-[var(--color-royal-red)] bg-white border-b-2 border-[var(--color-royal-red)]' : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              <Calendar className="w-4 h-4" />
              Event Schedule
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`flex-1 py-4 flex items-center justify-center gap-2 text-sm font-bold tracking-wider uppercase transition-all ${activeTab === 'info' ? 'text-[var(--color-royal-red)] bg-white border-b-2 border-[var(--color-royal-red)]' : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              <Info className="w-4 h-4" />
              Guest Info
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
            <form onSubmit={handleSubmit} className="space-y-8">
              {activeTab === 'general' ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]/50">Groom's Name</label>
                      <input type="text" name="groomName" value={formData.groomName} onChange={handleChange} className="admin-input" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]/50">Bride's Name</label>
                      <input type="text" name="brideName" value={formData.brideName} onChange={handleChange} className="admin-input" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]/50">Wedding Date</label>
                      <input type="date" name="weddingDate" value={formData.weddingDate} onChange={handleChange} className="admin-input" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]/50">Wedding Time</label>
                      <input type="time" name="weddingTime" value={formData.weddingTime} onChange={handleChange} className="admin-input" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]/50">Footer Message</label>
                      <input type="text" name="footerMessage" value={formData.footerMessage || ''} onChange={handleChange} className="admin-input" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]/50">Admin Phone (WhatsApp)</label>
                      <input type="tel" name="adminPhone" value={formData.adminPhone || ''} onChange={handleChange} className="admin-input" placeholder="919876543210" />
                    </div>

                  </div>

                  {/* Section Toggles */}
                  <div className="bg-gray-50 p-6 rounded-2xl border border-[var(--color-surface-low)]">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-ink)] mb-4 flex items-center gap-2">
                      <Layout className="w-4 h-4 text-[var(--color-royal-gold)]" />
                      Section Visibility
                    </h3>
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                      <div>
                        <p className="font-medium text-[var(--color-ink)]">Captured Moments (Gallery)</p>
                        <p className="text-xs text-gray-400">Show or hide the wedding photo gallery</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="showGallery"
                          checked={formData.showGallery}
                          onChange={(e) => setFormData(prev => ({ ...prev, showGallery: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-royal-red)]"></div>
                      </label>
                    </div>
                  </div>

                  {/* Royal Emblem Upload */}
                  <div className="bg-gray-50 p-6 rounded-2xl border border-[var(--color-surface-low)]">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-ink)] mb-4 flex items-center gap-2">
                      <Image className="w-4 h-4 text-[var(--color-royal-gold)]" />
                      Royal Wedding Emblem
                    </h3>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      {/* Preview */}
                      <div
                        className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-2 border-dashed border-[var(--color-royal-gold)]/30 bg-white flex items-center justify-center shrink-0"
                        onMouseEnter={() => setIsHoveringEmblem(true)}
                        onMouseLeave={() => setIsHoveringEmblem(false)}
                      >
                        {emblemPreview ? (
                          <>
                            <img
                              src={emblemPreview}
                              alt="Emblem Preview"
                              className="w-full h-full object-contain"
                            />
                            <AnimatePresence>
                              {isHoveringEmblem && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
                                  onClick={handleRemoveEmblem}
                                >
                                  <span className="text-white text-xs font-bold uppercase tracking-wider">Remove</span>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <div className="text-center text-gray-300 p-4">
                            <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p className="text-xs">No emblem uploaded</p>
                          </div>
                        )}
                      </div>

                      {/* Upload Controls */}
                      <div className="flex-1 text-center md:text-left">
                        <p className="text-sm text-[var(--color-ink)] mb-2">
                          Upload the royal emblem or monogram for the wedding invitation
                        </p>
                        <p className="text-xs text-gray-400 mb-4">
                          Recommended: Square image, at least 512x512px, max 5MB
                        </p>
                        <input
                          ref={emblemInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleEmblemUpload}
                          className="hidden"
                          id="emblem-upload"
                        />
                        <label
                          htmlFor="emblem-upload"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-royal-gold)] text-white rounded-xl cursor-pointer hover:bg-[var(--color-royal-gold)]/90 transition-all font-bold text-sm tracking-wider uppercase shadow-lg hover:shadow-xl"
                        >
                          <Upload className="w-4 h-4" />
                          Choose Image
                        </label>
                      </div>


                    </div>
                  </div>

                  {/* Invitation Image Upload */}
                  <div className="bg-gray-50 p-6 rounded-2xl border border-[var(--color-surface-low)]">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-ink)] mb-4 flex items-center gap-2">
                      <Image className="w-4 h-4 text-[var(--color-royal-gold)]" />
                      Wedding Invitation Image
                    </h3>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      {/* Preview */}
                      <div
                        className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-2 border-dashed border-[var(--color-royal-gold)]/30 bg-white flex items-center justify-center shrink-0"
                        onMouseEnter={() => setIsHoveringInvitation(true)}
                        onMouseLeave={() => setIsHoveringInvitation(false)}
                      >
                        {invitationPreview ? (
                          <>
                            <img
                              src={invitationPreview}
                              alt="Invitation Preview"
                              className="w-full h-full object-contain"
                            />
                            <AnimatePresence>
                              {isHoveringInvitation && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
                                  onClick={handleRemoveInvitation}
                                >
                                  <span className="text-white text-xs font-bold uppercase tracking-wider">Remove</span>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <div className="text-center text-gray-300 p-4">
                            <Image className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p className="text-xs">No invitation image uploaded</p>
                          </div>
                        )}
                      </div>

                      {/* Upload Controls */}
                      <div className="flex-1 text-center md:text-left">
                        <p className="text-sm text-[var(--color-ink)] mb-2">
                          Upload the main wedding invitation image
                        </p>
                        <p className="text-xs text-gray-400 mb-4">
                          Recommended: High quality image, max 5MB
                        </p>
                        <input
                          ref={invitationInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleInvitationUpload}
                          className="hidden"
                          id="invitation-upload"
                        />
                        <label
                          htmlFor="invitation-upload"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-royal-gold)] text-white rounded-xl cursor-pointer hover:bg-[var(--color-royal-gold)]/90 transition-all font-bold text-sm tracking-wider uppercase shadow-lg hover:shadow-xl"
                        >
                          <Upload className="w-4 h-4" />
                          Choose Image
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ) : activeTab === 'events' ? (
                <div className="space-y-12">
                  {formData.events.map((event, index) => (
                    <div key={event.id} className="p-6 bg-gray-50 rounded-2xl border border-[var(--color-surface-low)] space-y-6">
                      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                        <h3 className="font-serif text-xl text-[var(--color-royal-red)] flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-base"></span>
                          {event.name} Event
                        </h3>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">ID: {event.id}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-gray-400">English Name</label>
                          <input type="text" value={event.name} onChange={(e) => handleEventChange(index, e)} name="name" className="admin-input py-2 text-sm" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-gray-400">Hindi Name</label>
                          <input type="text" value={event.nameHindi} onChange={(e) => handleEventChange(index, e)} name="nameHindi" className="admin-input py-2 text-sm font-serif" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-gray-400">Date Text</label>
                          <input type="text" value={event.date} onChange={(e) => handleEventChange(index, e)} name="date" className="admin-input py-2 text-sm" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-gray-400">Time Text</label>
                          <input type="text" value={event.time} onChange={(e) => handleEventChange(index, e)} name="time" className="admin-input py-2 text-sm" />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <label className="text-[10px] font-bold uppercase text-gray-400">Venue</label>
                          <input type="text" value={event.venue} onChange={(e) => handleEventChange(index, e)} name="venue" className="admin-input py-2 text-sm" />
                        </div>
                        <div className="space-y-1 md:col-span-2">
                          <label className="text-[10px] font-bold uppercase text-gray-400">Description</label>
                          <textarea value={event.description} onChange={(e) => handleEventChange(index, e)} name="description" className="admin-input py-2 text-sm h-20 resize-none" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : activeTab === 'info' ? (
                <div className="space-y-12">
                  {formData.thingsToKnow.map((item, index) => (
                    <div key={index} className="p-6 bg-gray-50 rounded-2xl border border-[var(--color-surface-low)] space-y-6">
                      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                        <h3 className="font-serif text-xl text-[var(--color-royal-red)] flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-base">#{index + 1}</span>
                          {item.title} Info
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-gray-400">Title</label>
                          <input type="text" value={item.title} onChange={(e) => handleInfoChange(index, 'title', e.target.value)} className="admin-input py-2 text-sm" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-gray-400">Icon (Emoji)</label>
                          <input type="text" value={item.icon || ''} onChange={(e) => handleInfoChange(index, 'icon', e.target.value)} className="admin-input py-2 text-sm" placeholder="e.g., ☀️" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold uppercase text-gray-400">Description</label>
                          <textarea value={item.description} onChange={(e) => handleInfoChange(index, 'description', e.target.value)} className="admin-input py-2 text-sm h-24 resize-none" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </form>
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-white border-t border-[var(--color-surface-low)] flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
            <button
              onClick={handleSubmit}
              className="w-full sm:flex-1 btn-royal py-3 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto px-6 py-3 border-2 border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-500 rounded-xl transition-all flex items-center justify-center gap-2 font-bold text-sm tracking-widest uppercase"
            >
              <Trash2 className="w-5 h-5" />
              Reset All
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

