import { useState, useMemo } from "react";
import {
  Sun,
  Droplets,
  Shovel,
  Thermometer,
  Sprout,
  Info,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { crops } from "@/data/crops";
import { VoiceAssistant } from "@/components/VoiceAssistant";
import { Feedback } from "@/components/Feedback";

interface CropInfoPageProps {
  onSelectCrop?: (cropId: string) => void;
}

export function CropInfoPage({ onSelectCrop }: CropInfoPageProps) {
  const { lang, t, isRTL } = useLang();
  const [selectedCrop, setSelectedCrop] = useState<string>("");

  const crop = crops.find((c) => c.id === selectedCrop);

  const speechText = useMemo(() => {
    if (!crop) return "";
    const parts: string[] = [];
    parts.push(t(crop.nameKey));
    parts.push(crop.generalInfo.en);
    crop.cropCare.forEach((care) => parts.push(care.en));
    return parts.join(". ");
  }, [crop, t]);

  const conditionItems: {
    icon: typeof Sun;
    label: string;
    value: string;
  }[] = crop
    ? [
        { icon: Sun, label: t("crops.season"), value: crop.growingConditions.season[lang] },
        { icon: Shovel, label: t("crops.soil"), value: crop.growingConditions.soil[lang] },
        {
          icon: Thermometer,
          label: t("crops.temperature"),
          value: crop.growingConditions.temperature[lang],
        },
        {
          icon: Droplets,
          label: t("crops.waterNeeds"),
          value: crop.growingConditions.waterNeeds[lang],
        },
      ]
    : [];

  function handleCropClick(cropId: string) {
    setSelectedCrop(cropId);
  }

  function handleViewDetails(cropId: string) {
    if (onSelectCrop) {
      onSelectCrop(cropId);
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F7F5] pb-24 lg:pb-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md flex-shrink-0">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t("crops.title")}</h1>
            <p className="text-sm text-gray-500">{t("crops.subtitle")}</p>
          </div>
        </div>

        {/* Crop selector cards with images */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {crops.map((c) => (
            <button
              key={c.id}
              onClick={() => handleCropClick(c.id)}
              className={`rounded-2xl border-2 transition-all overflow-hidden text-left ${
                selectedCrop === c.id
                  ? "border-brand-500 shadow-md"
                  : "border-gray-100 bg-white hover:border-brand-200 hover:shadow-sm"
              }`}
            >
              <div className="relative h-28 overflow-hidden">
                <img
                  src={c.image}
                  alt={t(c.nameKey)}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <h3 className="absolute bottom-2 left-3 text-base font-bold text-white">
                  {t(c.nameKey)}
                </h3>
              </div>
            </button>
          ))}
        </div>

        {/* No selection prompt */}
        {!crop && (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
            <Info className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">{t("crops.selectPrompt")}</p>
          </div>
        )}

        {/* Crop info display */}
        {crop && (
          <div className="space-y-4 animate-fadeIn">
            {/* View details button */}
            <button
              onClick={() => handleViewDetails(crop.id)}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold text-sm hover:shadow-md transition-all"
            >
              <span>{t("crops.viewAdvisory")}</span>
              <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
            </button>

            {/* Voice Assistant */}
            <VoiceAssistant text={speechText} />

            {/* General Info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-brand-500" />
                {t("crops.generalInfo")}
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm">{crop.generalInfo[lang]}</p>
            </div>

            {/* Growing Conditions */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                {t("crops.growingConditions")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {conditionItems.map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-brand-50/60 border border-brand-100"
                    >
                      <div className="w-9 h-9 rounded-lg bg-brand-100 flex items-center justify-center flex-shrink-0">
                        <ItemIcon className="w-4 h-4 text-brand-700" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-brand-700 uppercase tracking-wide mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-sm text-gray-700 leading-relaxed">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Crop Care */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                {t("crops.cropCare")}
              </h3>
              <ul className="space-y-3">
                {crop.cropCare.map((care, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700 leading-relaxed">{care[lang]}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Feedback */}
            <Feedback page="crops" crop={selectedCrop} />
          </div>
        )}
      </div>
    </div>
  );
}
