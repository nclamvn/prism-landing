"use client";

import { Paperclip, Zap, Sparkles, ChevronDown, Loader2, Languages, CornerDownLeft } from 'lucide-react';
import { useState } from 'react';
import { translateText } from '@/lib/api';

interface TranslationResult {
  original_text: string;
  translated_text: string;
  quality_score: number;
  provider: string;
}

export default function Hero({ isEnglish }: { isEnglish: boolean }) {
  const [selectedModel, setSelectedModel] = useState('standard');
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(isEnglish ? 'vi' : 'en');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [error, setError] = useState('');
  
  const languages = [
    { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];
  
  const content = {
    vi: {
      greeting: "Xin chào",
      name: "Lâm Nguyễn",
      question: "Bạn cần chuyển đổi tài liệu gì hôm nay?",
      placeholder: "Upload file hoặc paste nội dung để bắt đầu...",
      standard: "Tiêu chuẩn",
      advanced: "Nâng cao",
      translating: "Đang xử lý...",
      result: "Kết quả",
      original: "Gốc",
      translated: "Đã dịch",
      quality: "Chất lượng"
    },
    en: {
      greeting: "Hello",
      name: "Lâm Nguyễn",
      question: "What document do you need to transform today?",
      placeholder: "Upload file or paste content to get started...",
      standard: "Standard",
      advanced: "Advanced",
      translating: "Processing...",
      result: "Result",
      original: "Original",
      translated: "Translated",
      quality: "Quality"
    }
  };
  
  const t = isEnglish ? content.en : content.vi;
  const selectedLang = languages.find(lang => lang.code === selectedLanguage);
  
  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    setIsTranslating(true);
    setError('');
    setResult(null);
    
    try {
      const response = await translateText(inputText, selectedLanguage);
      setResult(response);
    } catch (error) {
      console.error('Translation error:', error);
      setError('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTranslate();
    }
  };
  
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
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.placeholder}
            className="w-full px-6 py-5 pr-64 text-base bg-transparent resize-none 
                     focus:outline-none min-h-[120px] rounded-2xl"
            rows={3}
            disabled={isTranslating}
          />
          
          {/* Bottom controls - Left side: Language selector */}
          <div className="absolute bottom-4 left-4">
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-500 
                         hover:bg-gray-100 rounded-lg transition-colors"
                disabled={isTranslating}
              >
                <Languages className="w-4 h-4 text-gray-500" />
                <span className="flex items-center space-x-1">
                  <span>{selectedLang?.flag}</span>
                  <span className="hidden sm:inline">{selectedLang?.name}</span>
                </span>
                <ChevronDown className="w-3 h-3 text-gray-500" />
              </button>
              
              {showLanguageDropdown && (
                <div className="absolute bottom-full mb-1 left-0 bg-white border border-gray-200 
                              rounded-lg shadow-lg py-1 w-48 z-10 max-h-60 overflow-y-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang.code);
                        setShowLanguageDropdown(false);
                      }}
                      className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-100 flex items-center space-x-3
                                ${lang.code === selectedLanguage ? 'bg-blue-50 text-blue-600' : ''}`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Bottom controls - Right side: File, Model, Enter */}
          <div className="absolute bottom-4 right-4 flex items-center space-x-3">
            <button 
              className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={isTranslating}
            >
              <Paperclip className="w-4 h-4 text-gray-500" />
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-500 
                         hover:bg-gray-100 rounded-lg transition-colors"
                disabled={isTranslating}
              >
                {selectedModel === 'standard' ? 
                  <Zap className="w-4 h-4 text-gray-500" strokeWidth={2} /> : 
                  <Sparkles className="w-4 h-4 text-gray-500" strokeWidth={2} />
                }
                <span>{selectedModel === 'standard' ? t.standard : t.advanced}</span>
                <ChevronDown className="w-3 h-3 text-gray-500" />
              </button>
              
              {showModelDropdown && (
                <div className="absolute bottom-full mb-1 right-0 bg-white border border-gray-200 
                              rounded-lg shadow-lg py-1 w-40 z-10">
                  <button
                    onClick={() => {
                      setSelectedModel('standard');
                      setShowModelDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Zap className="w-4 h-4 text-gray-500" strokeWidth={2} />
                    <span>{t.standard}</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedModel('advanced');
                      setShowModelDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4 text-gray-500" strokeWidth={2} />
                    <span>{t.advanced}</span>
                  </button>
                </div>
              )}
            </div>
            
            <button
              onClick={handleTranslate}
              disabled={isTranslating || !inputText.trim()}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-500 
                       hover:bg-gray-100 rounded-lg transition-colors
                       disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              {isTranslating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t.translating}</span>
                </>
              ) : (
                <>
                  <CornerDownLeft className="w-4 h-4" />
                  <span>Enter</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}
        
        {result && (
          <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
            <h3 className="text-lg font-semibold">{t.result}</h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 mb-1">{t.original}:</p>
                <p className="text-gray-800">{result.original_text}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">{t.translated}:</p>
                <p className="text-gray-800 font-medium">{result.translated_text}</p>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>{t.quality}: {Math.round(result.quality_score * 100)}%</span>
                <span>Provider: {result.provider}</span>
                <span>→ {selectedLang?.name}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
