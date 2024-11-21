import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Careers from '../components/Careers';
import Contact from '../components/Contact';
import ContactModal from '../components/ContactModal';

export default function MainSite() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onGetStarted={() => setIsModalOpen(true)} />
      <Hero onGetStarted={() => setIsModalOpen(true)} />
      <Services />
      <About />
      <Careers />
      <Contact />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}