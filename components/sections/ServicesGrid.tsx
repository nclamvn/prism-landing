"use client";

import { Languages, Mic, Video, GraduationCap } from 'lucide-react';

const services = [
  {
    icon: Languages,
    title: {
      vi: "Dịch đa ngôn ngữ",
      en: "Multi-language Translation"
    },
    description: {
      vi: "Dịch tài liệu sang 100+ ngôn ngữ với AI",
      en: "Translate documents to 100+ languages with AI"
    }
  },
  {
    icon: Mic,
    title: {
      vi: "Tạo podcast",
      en: "Create Podcast"
    },
    description: {
      vi: "Chuyển văn bản thành kịch bản podcast chuyên nghiệp",
      en: "Transform text into professional podcast scripts"
    }
  },
  {
    icon: Video,
    title: {
      vi: "Video script",
      en: "Video Script"
    },
    description: {
      vi: "Tạo kịch bản video training từ tài liệu",
      en: "Generate video training scripts from documents"
    }
  },
  {
    icon: GraduationCap,
    title: {
      vi: "Khóa học online",
      en: "Online Course"
    },
    description: {
      vi: "Xây dựng module học tập từ nội dung của bạn",
      en: "Build learning modules from your content"
    }
  }
];

export default function ServicesGrid({ isEnglish = false }: { isEnglish?: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto px-4 py-8">
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <div
            key={index}
            className="bg-gray-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 
                     transition-all duration-300 cursor-pointer"
          >
            <Icon className="w-8 h-8 mb-4 text-gray-700" />
            <h3 className="text-lg font-medium mb-2 text-gray-800">
              {isEnglish ? service.title.en : service.title.vi}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {isEnglish ? service.description.en : service.description.vi}
            </p>
          </div>
        );
      })}
    </div>
  );
}
