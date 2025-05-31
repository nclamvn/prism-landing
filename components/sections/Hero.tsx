"use client";

import { Paperclip, Zap, Sparkles, ChevronDown, Loader2, Languages, CornerDownLeft, Upload, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
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
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
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
      quality: "Chất lượng",
      fileUploaded: "File đã tải lên",
      removeFile: "Xóa file"
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
      quality: "Quality",
      fileUploaded: "File uploaded",
      removeFile: "Remove file"
    }
  };
  
  const t = isEnglish ? content.en : content.vi;
  const selectedLang = languages.find(lang => lang.code === selectedLanguage);
  
  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 300; // Reduced max height
      const minHeight = 120;
      textareaRef.current.style.height = Math.max(minHeight, Math.min(scrollHeight, maxHeight)) + 'px';
    }
  }, [inputText]);
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['text/plain', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setError('Only PDF, DOCX, and TXT files are supported');
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      
      setUploadedFile(file);
      setError('');
      
      if (file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          setInputText(text.substring(0, 50000));
        };
        reader.readAsText(file);
      }
    }
  };
  
  const removeFile = () => {
    setUploadedFile(null);
    setInputText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleTranslate = async () => {
    if (!inputText.trim() && !uploadedFile) return;
    
    setIsTranslating(true);
    setError('');
    setResult(null);
    
    try {
      let textToTranslate = inputText.trim();
      
      if (uploadedFile && uploadedFile.type === 'text/plain') {
        // Text already loaded
      } else if (uploadedFile) {
        setError('PDF and DOCX processing coming soon! Please use text files for now.');
        setIsTranslating(false);
        return;
      }
      
      if (textToTranslate.length > 3000) {
        textToTranslate = textToTranslate.substring(0, 3000);
        setError('Large text detected. Processing first 3000 characters. Full document processing coming soon!');
      }
      
      const response = await translateText(textToTranslate, selectedLanguage);
      setResult(response);
      setError('');
    } catch (error) {
      console.error('Translation error:', error);
      setError('Translation failed. Please try with shorter text or check your connection.');
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
        <span className="block text-3xl md:text-4xl text-gray-400">{t.name}</span>
      </h1>
      
      <h2 className="text-sm md:text-base text-gray-400 text-center mb-10 font-medium">
        {t.question}
      </h2>
      
      <div className="w-full max-w-3xl">
        {/* File upload indicator - outside input box */}
        {uploadedFile && (
          <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Upload className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-800">{t.fileUploaded}: {uploadedFile.name}</span>
            </div>
            <button
              onClick={removeFile}
              className="text-blue-600 hover:text-blue-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        
        <div className="relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t.placeholder}
            className="w-full px-6 py-5 pb-16 text-base bg-transparent resize-none 
                     focus:outline-none rounded-2xl overflow-y-auto"
            style={{ 
              minHeight: '120px',
              maxHeight: '300px'
            }}
            disabled={isTranslating}
          />
          
          {/* Controls container - fixed height at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-between px-4 bg-white rounded-b-2xl">
            {/* Left side: Language selector */}
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
                              rounded-lg shadow-lg py-1 w-48 z-20 max-h-60 overflow-y-auto">
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
            
            {/* Right side: File, Model, Enter */}
            <div className="flex items-center space-x-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.pdf,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
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
                                rounded-lg shadow-lg py-1 w-40 z-20">
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
                disabled={isTranslating || (!inputText.trim() && !uploadedFile)}
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
                <p className="text-gray-800 whitespace-pre-wrap max-h-60 overflow-y-auto">{result.original_text}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">{t.translated}:</p>
                <p className="text-gray-800 font-medium whitespace-pre-wrap max-h-60 overflow-y-auto">{result.translated_text}</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span>{t.quality}: {Math.round(result.quality_score * 100)}%</span>
                <span>Provider: {result.provider}</span>
                <span>→ {selectedLang?.name}</span>
                {uploadedFile && <span>File: {uploadedFile.name}</span>}
                <span>Characters: {inputText.length}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
