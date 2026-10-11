import { useState, useMemo } from "react";
import {
  ClipboardList,
  Sprout,
  Droplets,
  CheckCircle,
  Info,
  AlertTriangle,
  Sun,
  Shovel,
  Thermometer,
} from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { crops } from "@/data/crops";
import { growthStages, irrigationData, type GrowthStage } from "@/data/irrigation";
import { VoiceAssistant } from "@/components/VoiceAssistant";
import { Feedback } from "@/components/Feedback";

export function MyAdvisoryPage() {
  const { lang, t } = useLang();
  const [selectedCrop, setSelectedCrop] = useState<string>("");
  const [selectedStage, setSelectedStage] = useState<string>("");
  const [showAdvisory, setShowAdvisory] = useState(false);

  function handleViewAdvisory() {
    if (selectedCrop) {
      setShowAdvisory(true);
    }
  }

  function handleCropChange(value: string) {
    setSelectedCrop(value);
    setShowAdvisory(false);
  }

  function handleStageChange(value: string) {
    setSelectedStage(value);
    setShowAdvisory(false);
  }

  const crop = crops.find((c) => c.id === selectedCrop);
  const guidance = irrigationData.find(
    (g) => g.cropId === selectedCrop && g.stage === (selectedStage as GrowthStage)
  );
  const cropName = crop?.nameKey;
  const stageName = growthStages.find((s) => s.id === selectedStage)?.labelKey;

  const speechText = useMemo(() => {
    if (!crop) return "";
    const parts: string[] = [];
    parts.push(t(crop.nameKey));
    parts.push(crop.generalInfo.en);
    if (guidance) {
      parts.push(t("advisory.irrigation"));
      parts.push(guidance.guidance.en);
    }
    parts.push(t("advisory.cropCare"));
    crop.cropCare.forEach((care) => parts.push(care.en));
    return parts.join(". ");
  }, [crop, guidance, t]);

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

  return (
    <div className="min-h-screen bg-[#F5F7F5] pb-24 lg:pb-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md flex-shrink-0">
          <ClipboardList className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {t("advisory.title")}
          </h1>
          <p className="text-sm text-gray-500">{t("advisory.subtitle")}</p>
        </div>
      </div>

      {/* Selection form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("advisory.selectCrop")}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {crops.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleCropChange(c.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-center ${
                    selectedCrop === c.id
                      ? "border-brand-500 bg-brand-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-brand-300"
                  }`}
                >
                  <Sprout
                    className={`w-6 h-6 mx-auto mb-2 ${
                      selectedCrop === c.id ? "text-brand-600" : "text-gray-400"
                    }`}
                  />
                  <span className={`text-sm font-medium ${selectedCrop === c.id ? "text-brand-800" : "text-gray-700"}`}>
                    {t(c.nameKey)}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("advisory.selectStage")}
            </label>
            <select
              value={selectedStage}
              onChange={(e) => handleStageChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent text-base"
            >
              <option value="">{t("common.select")}</option>
              {growthStages.map((s) => (
                <option key={s.id} value={s.id}>
                  {t(s.labelKey)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleViewAdvisory}
          disabled={!selectedCrop}
          className="mt-5 w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-500 text-white font-semibold text-base hover:bg-brand-600 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
        >
          {t("advisory.viewAdvisory")}
        </button>
      </div>

      {/* No selection prompt */}
      {!showAdvisory && !crop && (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
          <Info className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">{t("advisory.selectPrompt")}</p>
        </div>
      )}

      {/* Advisory display */}
      {showAdvisory && crop && (
        <div className="space-y-6 animate-fadeIn">
          <VoiceAssistant text={speechText} />

          {/* Summary header */}
          <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl border border-brand-200 p-5">
            <h3 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-brand-600" />
              {t("advisory.summary")}
            </h3>
            <p className="text-sm text-gray-700">
              {cropName && t(cropName)}
              {stageName && <span className="text-gray-500"> — {t(stageName)}</span>}
            </p>
          </div>

          {/* Crop Information */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Sprout className="w-5 h-5 text-brand-500" />
              {t("advisory.cropInfo")}
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">{crop.generalInfo[lang]}</p>
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

          {/* Irrigation Guidance (if stage selected) */}
          {selectedStage && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-600" />
                {t("advisory.irrigation")}
              </h3>
              {guidance ? (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-4 h-4 text-brand-500" />
                    <span className="text-sm font-medium text-brand-700">
                      {stageName && t(stageName)}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{guidance.guidance[lang]}</p>
                </>
              ) : (
                <p className="text-gray-500">{t("advisory.noGuidance")}</p>
              )}
            </div>
          )}

          {/* Crop Care Tips */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-brand-500" />
              {t("advisory.cropCare")}
            </h3>
            <ul className="space-y-3">
              {crop.cropCare.map((care, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed">{care[lang]}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 leading-relaxed">{t("advisory.disclaimer")}</p>
          </div>

          {/* Feedback */}
          <Feedback page="advisory" crop={selectedCrop} stage={selectedStage} />
        </div>
      )}
      </div>
    </div>
  );
}
