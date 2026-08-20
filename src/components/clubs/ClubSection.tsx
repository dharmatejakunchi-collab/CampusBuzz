import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Sparkles, 
  Calendar, 
  ExternalLink, 
  FileText, 
  Lock, 
  ShieldCheck, 
  Plus, 
  Heart, 
  Share2, 
  Download, 
  AlertTriangle,
  Flame,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ClubAnnouncement } from '../../types';
import { db } from '../../lib/firebase';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, arrayUnion, arrayRemove, increment } from 'firebase/firestore';
import { CreateAnnouncementModal } from './CreateAnnouncementModal';
import { INITIAL_USERS } from '../../lib/seedData';

interface ClubSectionProps {
  onNavigateToCalendar?: (eventId?: string) => void;
}

export const ClubSection: React.FC<ClubSectionProps> = ({ onNavigateToCalendar }) => {
  const { profile, role, setDemoUser } = useAuth();
  const [announcements, setAnnouncements] = useState<ClubAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeFormEmbedId, setActiveFormEmbedId] = useState<string | null>(null);

  const canPost = role === 'club' || role === 'committee' || role === 'admin';

  useEffect(() => {
    setLoading(true);
    const announcementsRef = collection(db, 'club_announcements');
    const q = query(announcementsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list: ClubAnnouncement[] = [];
        snapshot.forEach((d) => {
          list.push({ id: d.id, ...d.data() } as ClubAnnouncement);
        });
        setAnnouncements(list);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching club announcements:', err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleLikeToggle = async (announcement: ClubAnnouncement) => {
    if (!profile) return;
    const isLiked = announcement.likedBy?.includes(profile.uid);
    try {
      const docRef = doc(db, 'club_announcements', announcement.id);
      if (isLiked) {
        await updateDoc(docRef, {
          likedBy: arrayRemove(profile.uid),
          likesCount: increment(-1)
        });
      } else {
        await updateDoc(docRef, {
          likedBy: arrayUnion(profile.uid),
          likesCount: increment(1)
        });
      }
    } catch (err) {
      console.error('Error liking announcement:', err);
    }
  };

  const filteredAnnouncements = announcements.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.clubCategory?.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Club Hub Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white shadow-xl border border-purple-900/50">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-black tracking-wider uppercase">
            <Building2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Official Campus Communication</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Club, Committee & Administration Hub
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            A distinct, role-governed channel for student councils, recognized clubs, and administrative departments to broadcast verified bulletins, embedded registration forms, and schedule calendar events.
          </p>

          {/* Action Row */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {canPost ? (
              <button
                id="create-club-post-btn"
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-purple-600/30 flex items-center space-x-1.5 active:scale-95 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Official Notice</span>
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-2 bg-purple-900/40 border border-purple-700/60 p-2.5 rounded-2xl text-xs">
                <span className="text-purple-200 font-semibold flex items-center">
                  <Lock className="w-3.5 h-3.5 mr-1 text-purple-400" />
                  Posting restricted to Club / Admin roles.
                </span>
                <span className="text-slate-400">• Try demo switch:</span>
                <button
                  onClick={() => setDemoUser(INITIAL_USERS[2])} // Robotics Club
                  className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-[11px]"
                >
                  Robotics Club Lead
                </button>
                <button
                  onClick={() => setDemoUser(INITIAL_USERS[4])} // Admin Dean
                  className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-[11px]"
                >
                  Campus Admin
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-purple-500/20 to-transparent pointer-events-none" />
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {['all', 'Technical', 'Cultural', 'Sports', 'Academic', 'Career', 'Administration'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-purple-50'
            }`}
          >
            {cat === 'all' ? '🏛️ All Official Bulletins' : cat}
          </button>
        ))}
      </div>

      {/* Announcements List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-64 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          ))}
        </div>
      ) : filteredAnnouncements.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
          <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-2" />
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
            No official bulletins in this category
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Official announcements from verified campus clubs and administration will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredAnnouncements.map((item) => {
            const isLiked = profile ? item.likedBy?.includes(profile.uid) : false;
            const isFormOpen = activeFormEmbedId === item.id;

            return (
              <div
                key={item.id}
                id={`announcement-card-${item.id}`}
                className="bg-white dark:bg-slate-800/95 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col md:flex-row"
              >
                {/* Banner Thumbnail (if present) */}
                {item.bannerUrl && (
                  <div className="md:w-72 h-48 md:h-auto shrink-0 relative bg-slate-900">
                    <img
                      src={item.bannerUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-purple-600 text-white shadow">
                        {item.clubCategory || 'Official'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Club Header Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center font-black text-xs border border-purple-200 dark:border-purple-800">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center space-x-1.5">
                            <span>{item.clubName}</span>
                            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {new Date(item.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })} • Official Bulletin
                          </div>
                        </div>
                      </div>

                      {item.isPinned && (
                        <span className="px-2 py-0.5 rounded text-[10px] uppercase font-black bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40">
                          Pinned Notice
                        </span>
                      )}
                    </div>

                    {/* Title & Body */}
                    <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
                      {item.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                      {item.content}
                    </p>

                    {/* Linked Event Tag */}
                    {item.linkedEventId && (
                      <div className="inline-flex items-center space-x-2 p-2 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span>Linked to Campus Event Calendar</span>
                        {onNavigateToCalendar && (
                          <button
                            onClick={() => onNavigateToCalendar(item.linkedEventId)}
                            className="ml-2 text-[11px] underline hover:text-blue-900"
                          >
                            View on Calendar →
                          </button>
                        )}
                      </div>
                    )}

                    {/* Embedded Google Form Section (per spec requirement) */}
                    {item.googleFormUrl && (
                      <div className="pt-2">
                        <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
                            <div>
                              <div className="font-extrabold text-xs text-purple-950 dark:text-purple-200">
                                {item.googleFormTitle || 'Official Google Form Registration'}
                              </div>
                              <div className="text-[10px] text-purple-700 dark:text-purple-400">
                                Embeds form responses & applications
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setActiveFormEmbedId(isFormOpen ? null : item.id)}
                              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition-all"
                            >
                              {isFormOpen ? 'Hide Form Embed' : 'Open Embedded Form'}
                            </button>
                            <a
                              href={item.googleFormUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 text-purple-600 hover:text-purple-800 dark:text-purple-300"
                              title="Open in new tab"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </div>

                        {/* Interactive Form Embed iFrame */}
                        {isFormOpen && (
                          <div className="mt-3 rounded-2xl border border-purple-300 dark:border-purple-700 overflow-hidden bg-white shadow-inner animate-in fade-in">
                            <div className="p-2 bg-purple-100 dark:bg-purple-950 text-[11px] font-semibold text-purple-900 dark:text-purple-200 flex items-center justify-between">
                              <span>📋 Interactive Campus Form Embed</span>
                              <a href={item.googleFormUrl} target="_blank" rel="noreferrer" className="underline">
                                Open external
                              </a>
                            </div>
                            <iframe
                              src={item.googleFormUrl}
                              width="100%"
                              height="450"
                              frameBorder="0"
                              className="w-full"
                              title={item.title}
                            >
                              Loading form...
                            </iframe>
                          </div>
                        )}
                      </div>
                    )}

                    {/* External links & attachments */}
                    {(item.externalUrl || item.attachmentName) && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {item.externalUrl && (
                          <a
                            href={item.externalUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700/60 hover:bg-purple-100 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span className="truncate max-w-[200px]">{item.externalUrl}</span>
                          </a>
                        )}
                        {item.attachmentName && (
                          <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                            <Download className="w-3.5 h-3.5 text-purple-500" />
                            <span>{item.attachmentName}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between text-xs">
                    <div className="text-slate-400 text-[11px]">
                      Broadcasting to campus student body
                    </div>
                    <button
                      onClick={() => handleLikeToggle(item)}
                      className={`flex items-center space-x-1 px-3 py-1 rounded-lg border transition-all ${
                        isLiked
                          ? 'bg-rose-50 dark:bg-rose-950 text-rose-500 border-rose-300'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500' : ''}`} />
                      <span className="font-bold">{item.likesCount || 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Publish Modal */}
      {showCreateModal && (
        <CreateAnnouncementModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
};
