import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Check, Sparkles, X } from 'lucide-react';
import { useTheme, THEMES } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({ isOpen, onClose }) => {
  const { themeId, setTheme, currentTheme } = useTheme();
  const { profile, updateProfileData } = useAuth();

  const handleSelectTheme = (id: string) => {
    setTheme(id);
    if (profile?.uid) {
      updateProfileData({ preferredTheme: id });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 p-6 space-y-6"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2.5 rounded-2xl bg-gradient-to-tr ${currentTheme.gradient} text-slate-800 dark:text-slate-900 shadow-md`}>
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-black text-xl text-slate-900 dark:text-white">
                  Pastel Themes & Aesthetics
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Select your favorite soft pastel color scheme for Campus Buzz
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Theme Choices Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[60vh] overflow-y-auto pr-1">
            {THEMES.map((theme) => {
              const isSelected = themeId === theme.id;
              return (
                <motion.button
                  key={theme.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectTheme(theme.id)}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-3 transition-all relative overflow-hidden ${
                    isSelected
                      ? 'bg-slate-50 dark:bg-slate-800/90 border-2 border-purple-500 dark:border-purple-400 shadow-md shadow-purple-500/10'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {/* Selected check ribbon */}
                  {isSelected && (
                    <div className="absolute top-2.5 right-2.5 flex items-center space-x-1 px-2 py-0.5 rounded-full bg-purple-600 text-white text-[10px] font-black uppercase">
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>Active</span>
                    </div>
                  )}

                  <div>
                    {/* Color Swatch Dots */}
                    <div className="flex items-center space-x-1.5 mb-2">
                      {theme.previewColors.map((col, idx) => (
                        <div
                          key={idx}
                          className="w-4 h-4 rounded-full shadow-xs border border-white/40"
                          style={{ backgroundColor: col }}
                        />
                      ))}
                    </div>

                    {/* Theme Name */}
                    <div className="font-display font-extrabold text-sm text-slate-900 dark:text-white flex items-center space-x-1.5">
                      <span>{theme.name}</span>
                    </div>

                    {/* Tagline */}
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                      {theme.tagline}
                    </p>
                  </div>

                  {/* Gradient preview bar */}
                  <div className={`h-2 w-full rounded-full bg-gradient-to-r ${theme.gradient}`} />
                </motion.button>
              );
            })}
          </div>

          {/* Modal Footer */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>Pastel theme choice automatically saved to your browser</span>
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
