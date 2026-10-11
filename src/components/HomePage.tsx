import { useState } from "react";
import {
  Sprout,
  Droplets,
  Bug,
  Lightbulb,
  Search,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { crops } from "@/data/crops";
import { WeatherCard } from "@/components/WeatherCard";
import type { PageId } from "@/components/Header";

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectCrop?: (cropId: string) => void;
}

export function HomePage({ onNavigate, onSelectCrop }: HomePageProps) {
  const { t, isRTL, lang } = useLang();
  const [searchQuery, setSearchQuery] = useState("");

  const features: {
    id: PageId;
    titleKey: string;
    descKey: string;
    icon: typeof Sprout;
    color: string;
    bgColor: string;
  }[] = [
    {
      id: "crops",
      titleKey: "home.feature1Title",
      descKey: "home.feature1Desc",
      icon: Sprout,
      color: "text-brand-600",
      bgColor: "bg-brand-50",
    },
    {
      id: "irrigation",
      titleKey: "home.feature2Title",
      descKey: "home.feature2Desc",
      icon: Droplets,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "problems",
      titleKey: "home.feature3Title",
      descKey: "home.feature3Desc",
      icon: Bug,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      id: "tips",
      titleKey: "home.feature4Title",
      descKey: "home.feature4Desc",
      icon: Lightbulb,
      color: "text-teal-600",
      bgColor: "bg-teal-50",
    },
  ];

  function handleCropClick(cropId: string) {
    if (onSelectCrop) {
      onSelectCrop(cropId);
    } else {
      onNavigate("crops");
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const query = searchQuery.toLowerCase();
    if (query.includes("cotton") || query.includes("کپاس") || query.includes("ڪپهه")) {
      handleCropClick("cotton");
    } else if (query.includes("wheat") || query.includes("گندم") || query.includes("ڪڻڪ")) {
      handleCropClick("wheat");
    } else if (query.includes("rice") || query.includes("چاول") || query.includes("چانور")) {
      handleCropClick("rice");
    } else if (query.includes("irrigation") || query.includes("سنچائی") || query.includes("آبياري")) {
      onNavigate("irrigation");
    } else if (query.includes("tip") || query.includes("نکات") || query.includes("نڪتا")) {
      onNavigate("tips");
    } else if (query.includes("problem") || query.includes("مسئل")) {
      onNavigate("problems");
    } else {
      onNavigate("crops");
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F7F5]">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center flex-shrink-0">
              <Sprout className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold leading-tight">
                {t("home.welcome")}
              </h1>
              <p className="text-sm text-brand-100">{t("appTagline")}</p>
            </div>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("home.searchPlaceholder")}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-gray-800 text-base placeholder:text-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-400 min-h-[52px]"
            />
          </form>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 pb-24 lg:pb-12 space-y-6">
        {/* Weather Card */}
        <WeatherCard />

        {/* Quick Access */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-3">{t("home.quickAccess")}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {features.map((feature) => {
              const FeatureIcon = feature.icon;
              return (
                <button
                  key={feature.id}
                  onClick={() => onNavigate(feature.id)}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all text-left group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}
                  >
                    <FeatureIcon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {t(feature.descKey)}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* My Farm Advisory CTA */}
        <button
          onClick={() => onNavigate("advisory")}
          className="w-full bg-gradient-to-r from-brand-600 to-brand-500 rounded-2xl p-5 shadow-md hover:shadow-lg transition-all text-left group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <ClipboardList className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">{t("nav.advisory")}</h3>
                <p className="text-xs text-brand-100">{t("advisory.subtitle")}</p>
              </div>
            </div>
            <ArrowRight
              className={`w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform ${isRTL ? "rotate-180" : ""}`}
            />
          </div>
        </button>

        {/* Popular Crops */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-3">{t("home.popularCrops")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {crops.map((crop) => (
              <button
                key={crop.id}
                onClick={() => handleCropClick(crop.id)}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all overflow-hidden group text-left"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={crop.image}
                    alt={t(crop.nameKey)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <h3 className="absolute bottom-3 left-4 text-lg font-bold text-white">
                    {t(crop.nameKey)}
                  </h3>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {crop.generalInfo[lang].split(".")[0]}.
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
