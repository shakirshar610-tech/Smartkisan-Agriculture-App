import { useMemo } from "react";
import {
  ArrowLeft,
  Sun,
  Droplets,
  Shovel,
  Thermometer,
  CheckCircle,
  Info,
  Sprout,
  ArrowRight,
  ClipboardList,
} from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { crops } from "@/data/crops";
import { growthStages, irrigationData } from "@/data/irrigation";
import { symptomGuides } from "@/data/problems";
import { farmingTips } from "@/data/tips";
import { VoiceAssistant } from "@/components/VoiceAssistant";
import { Feedback } from "@/components/Feedback";
import type { PageId } from "@/components/Header";

interface CropDetailPageProps {
  cropId: string;
  onNavigate: (page: PageId) => void;
  onBack: () => void;
}

export function CropDetailPage({ cropId, onNavigate, onBack }: CropDetailPageProps) {
  const { lang, t, isRTL } = useLang();

  const crop = crops.find((c) => c.id === cropId);

  const cropIrrigation = useMemo(
    () => irrigationData.filter((g) => g.cropId === cropId),
    [cropId]
  );

  const cropTips = farmingTips.filter(
    (tip) => !tip.cropIds || tip.cropIds.includes(cropId)
  );
  const relatedTips = (cropTips.length > 0 ? cropTips : farmingTips).slice(0, 3);

  const cropProblems = symptomGuides.filter(
    (guide) => !guide.cropIds || guide.cropIds.includes(cropId)
  );
  const relatedProblems = (cropProblems.length > 0 ? cropProblems : symptomGuides).slice(0, 3);

  const speechText = useMemo(() => {
    if (!crop) return "";
    const parts: string[] = [];
    parts.push(t(crop.nameKey));
    parts.push(crop.generalInfo.en);
    crop.cropCare.forEach((care) => parts.push(care.en));
    return parts.join(". ");
  }, [crop, t]);

  if (!crop) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <Info className="w-10 h-10 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">{t("crops.selectPrompt")}</p>
        <button
          onClick={onBack}
          className="mt-4 px-5 py-2.5 rounded-xl bg-brand-500 text-white font-medium text-sm hover:bg-brand-600 transition-colors"
        >
          {t("common.back")}
        </button>
      </div>
    );
  }

  const conditionItems = [
    { icon: Sun, label: t("crops.season"), value: crop.growingConditions.season[lang] },
    { icon: Shovel, label: t("crops.soil"), value: crop.growingConditions.soil[lang] },
    { icon: Thermometer, label: t("crops.temperature"), value: crop.growingConditions.temperature[lang] },
    { icon: Droplets, label: t("crops.waterNeeds"), value: crop.growingConditions.waterNeeds[lang] },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7F5] pb-24 lg:pb-10">
      {/* Hero image */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={crop.image}
          alt={t(crop.nameKey)}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className={`w-5 h-5 text-white ${isRTL ? "rotate-180" : ""}`} />
        </button>
        <div className="absolute bottom-6 left-4 right-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            {t(crop.nameKey)}
          </h1>
          <p className="text-sm text-white/80 line-clamp-2 max-w-2xl">
            {crop.generalInfo[lang].split(".")[0]}.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <VoiceAssistant text={speechText} />

        {/* General Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-brand-500" />
            {t("crops.generalInfo")}
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm">{crop.generalInfo[lang]}</p>
        </div>

        {/* Growing Conditions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            {t("crops.growingConditions")}
          </h2>
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

        {/* Growth Stages & Irrigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Sprout className="w-5 h-5 text-brand-500" />
            {t("crops.growthStages")}
          </h2>
          <div className="space-y-3">
            {growthStages.map((stage) => {
              const guidance = cropIrrigation.find((g) => g.stage === stage.id);
              return (
                <div key={stage.id} className="p-3 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <h3 className="text-sm font-semibold text-gray-900">{t(stage.labelKey)}</h3>
                  </div>
                  {guidance ? (
                    <p className="text-sm text-gray-600 leading-relaxed">{guidance.guidance[lang]}</p>
                  ) : (
                    <p className="text-sm text-gray-400">—</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Crop Care */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            {t("crops.cropCare")}
          </h2>
          <ul className="space-y-3">
            {crop.cropCare.map((care, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-relaxed">{care[lang]}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Common Problems (first 3 symptoms as general reference) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            {t("crops.commonProblems")}
          </h2>
          <div className="space-y-2">
            {relatedProblems.map((guide) => (
              <button
                key={guide.id}
                onClick={() => onNavigate("problems")}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-amber-50/50 border border-amber-100 hover:bg-amber-50 transition-colors text-left"
              >
                <span className="text-sm text-gray-700">{t(guide.labelKey)}</span>
                <ArrowRight className={`w-4 h-4 text-amber-600 flex-shrink-0 ${isRTL ? "rotate-180" : ""}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Related Tips */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-base font-semibold text-gray-900 mb-4">
            {t("crops.relatedTips")}
          </h2>
          <div className="space-y-3">
            {relatedTips.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{tip.title[lang]}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{tip.description[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View Advisory button */}
        <button
          onClick={() => onNavigate("advisory")}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-500 text-white font-semibold text-base hover:bg-brand-600 transition-colors shadow-md min-h-[52px]"
        >
          <ClipboardList className="w-5 h-5" />
          {t("crops.viewAdvisory")}
        </button>

        {/* Feedback */}
        <Feedback page="crops" crop={cropId} />
      </div>
    </div>
  );
}
