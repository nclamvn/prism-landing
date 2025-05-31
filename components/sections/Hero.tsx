"use client";

import { Paperclip, Zap, Sparkles, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Hero({ isEnglish }: { isEnglish: boolean }) {
  const [selectedModel, setSelectedModel] = useState('standard');
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  
  const content = {
    vi: {
      greeting: "Xin chào",
      name: "Lâm Nguyễn",
      question: "Bạn cần chuyển đổi tài liệu gì hôm nay?",
      placeholder: "Upload file hoặc paste nội dung để bắt đầu...",
      standard: "Tiêu chuẩn",
      advanced: "Nâng cao"
    },
    en: {
      greeting: "Hello",
      name: "Lâm Nguyễn",
      question: "What document do you need to transform today?",
      placeholder: "Upload file or paste content to get started...",
      standard: "Standard",
      advanced: "Advanced"
    }
  };
  
  const t = isEnglish ? content.en : content.vi;
  
  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-normal text-center mb-3">
        <span className="block text-black">{t.greeting}</span>
        <span className="block text-gray-500">{t.name}</span>
      </h1>
      
      <h2 className="text-base md:text-lg text-gray-700 text-center mb-10 font-medium">
        {t.question}
      </h2>
      
      <div className="w-full max-w-3xl">
        <div className="relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <textarea
            placeholder={t.placeholder}
            className="w-full px-6 py-5 pr-48 text-base bg-transparent resize-none 
                     focus:outline-none min-h-[120px] rounded-2xl"
            rows={3}
          />
          
          <div className="absolute bottom-4 right-4 flex items-center space-x-3">
            <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
              <Paperclip className="w-4 h-4 text-black" />
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 
                         hover:bg-gray-100 rounded-lg transition-colors"
              >
                {selectedModel === 'standard' ? 
                  <Zap className="w-4 h-4 text-black" strokeWidth={2} /> : 
                  <Sparkles className="w-4 h-4 text-black" strokeWidth={2} />
                }
                <span>{selectedModel === 'standard' ? t.standard : t.advanced}</span>
                <ChevronDown className="w-3 h-3 text-black" />
              </button>
              
              {showModelDropdown && (
                <div className="absolute bottom-full mb-1 right-0 bg-white border border-gray-200 
                              rounded-lg shadow-lg py-1 w-40">
                  <button
                    onClick={() => {
                      setSelectedModel('standard');
                      setShowModelDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Zap className="w-4 h-4 text-black" strokeWidth={2} />
                    <span>{t.standard}</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedModel('advanced');
                      setShowModelDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4 text-black" strokeWidth={2} />
                    <span>{t.advanced}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
