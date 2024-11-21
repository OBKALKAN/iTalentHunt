import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
  onGetStarted: () => void;
}

export default function Navbar({ onGetStarted }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">iTalentHunt</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#services">{t('nav.services')}</NavLink>
            <NavLink href="#about">{t('nav.about')}</NavLink>
            <NavLink href="#careers">{t('nav.careers')}</NavLink>
            <NavLink href="#contact">{t('nav.contact')}</NavLink>
            <LanguageSwitcher />
            <button 
              onClick={onGetStarted}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              {t('nav.getStarted')}
            </button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <MobileNavLink href="#services">{t('nav.services')}</MobileNavLink>
              <MobileNavLink href="#about">{t('nav.about')}</MobileNavLink>
              <MobileNavLink href="#careers">{t('nav.careers')}</MobileNavLink>
              <MobileNavLink href="#contact">{t('nav.contact')}</MobileNavLink>
              <div className="py-2">
                <LanguageSwitcher />
              </div>
              <button 
                onClick={() => {
                  setIsOpen(false);
                  onGetStarted();
                }}
                className="w-full bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                {t('nav.getStarted')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-gray-600 hover:text-blue-600 transition-colors"
    >
      {children}
    </a>
  );
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="block text-gray-600 hover:text-blue-600 transition-colors py-2"
    >
      {children}
    </a>
  );
}