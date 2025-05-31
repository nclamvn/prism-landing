"use client";

import { useState } from 'react';
import Navbar from '../../components/sections/Navbar';
import Hero from '../../components/sections/Hero';
import ServicesGrid from '../../components/sections/ServicesGrid';

export default function Home() {
  const [isEnglish, setIsEnglish] = useState(false);
  
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <Navbar isEnglish={isEnglish} setIsEnglish={setIsEnglish} />
      <div className="max-w-6xl mx-auto">
        <Hero isEnglish={isEnglish} />
        <ServicesGrid isEnglish={isEnglish} />
      </div>
    </main>
  );
}
