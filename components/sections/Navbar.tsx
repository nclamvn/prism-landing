"use client";

export default function Navbar({ isEnglish, setIsEnglish }: { 
  isEnglish: boolean; 
  setIsEnglish: (value: boolean) => void;
}) {
  const content = {
    vi: {
      features: "Tính năng",
      pricing: "Bảng giá", 
      docs: "Tài liệu",
      contact: "Liên hệ"
    },
    en: {
      features: "Features",
      pricing: "Pricing",
      docs: "Documentation", 
      contact: "Contact"
    }
  };
  
  const t = isEnglish ? content.en : content.vi;
  
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
      <div className="flex items-center space-x-3">
        <img 
          src="/images/prism-logo.png" 
          alt="PRISM"
          className="w-8 h-8"
        />
        <span className="text-xl font-semibold">PRISM</span>
      </div>
      
      <div className="flex items-center space-x-6">
        <a href="#" className="text-sm text-gray-600 hover:text-black hover:font-semibold transition-all">
          {t.features}
        </a>
        <a href="#" className="text-sm text-gray-600 hover:text-black hover:font-semibold transition-all">
          {t.pricing}
        </a>
        <a href="#" className="text-sm text-gray-600 hover:text-black hover:font-semibold transition-all">
          {t.docs}
        </a>
        <a href="#" className="text-sm text-gray-600 hover:text-black hover:font-semibold transition-all">
          {t.contact}
        </a>
        
        <button
          onClick={() => setIsEnglish(!isEnglish)}
          className="ml-4 px-3 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors"
        >
          {isEnglish ? 'VI' : 'EN'}
        </button>
      </div>
    </nav>
  );
}
