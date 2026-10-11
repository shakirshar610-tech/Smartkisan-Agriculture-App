import { useState, useMemo } from "react";
import { Droplets, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { crops } from "@/data/crops";
import { growthStages, irrigationData, type GrowthStage } from "@/data/irrigation";
import { VoiceAssistant } from "@/components/VoiceAssistant";
import { Feedback } from "@/components/Feedback";

export function IrrigationPage() {
  const { lang, t } = useLang();
  const [selectedCrop, setSelectedCrop] = useState<string>("");
  const [selectedStage, setSelectedStage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showGuidance, setShowGuidance] = useState(false);

  function handleViewGuidance() {
    if (!selectedCrop) {
      setError(t("irrigation.cropRequired"));
      setShowGuidance(false);
      return;
    }
    if (!selectedStage) {
      setError(t("irrigation.stageRequired"));
      setShowGuidance(false);
      return;
    }
    setError("");
    setShowGuidance(true);
  }

  function handleCropChange(value: string) {
    setSelectedCrop(value);
    setError("");
    setShowGuidance(false);
  }

  function handleStageChange(value: string) {
    setSelectedStage(value);
    setError("");
    setShowGuidance(false);
  }

  const guidance = irrigationData.find(
    (g) => g.cropId === selectedCrop && g.stage === (selectedStage as GrowthStage)
  );

  const cropName = crops.find((c) => c.id === selectedCrop)?.nameKey;
  const stageName = growthStages.find((s) => s.id === selectedStage)?.labelKey;

  const speechText = useMemo(() => {
    if (!guidance || !cropName || !stageName) return "";
    const parts: string[] = [];
    parts.push(t(cropName));
    parts.push(t(stageName));
    parts.push(t("irrigation.guidance"));
    parts.push(guidance.guidance.en);
    return parts.join(". ");
  }, [guidance, cropName, stageName, t]);

  return (
    <div className="min-h-screen bg-[#F5F7F5] pb-24 lg:pb-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md flex-shrink-0">
          <Droplets className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {t("irrigation.title")}
          </h1>
          <p className="text-sm text-gray-500">{t("irrigation.subtitle")}</p>
        </div>
      </div>

      {/* Selection form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("irrigation.selectCrop")}
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => handleCropChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent text-base"
            >
              <option value="">{t("common.select")}</option>
              {crops.map((c) => (
                <option key={c.id} value={c.id}>
                  {t(c.nameKey)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("irrigation.selectStage")}
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

        {error && (
          <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button
          onClick={handleViewGuidance}
          className="mt-5 w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-500 text-white font-semibold text-base hover:bg-brand-600 transition-colors shadow-md hover:shadow-lg min-h-[48px]"
        >
          {t("irrigation.viewGuidance")}
        </button>
      </div>

      {/* Guidance display */}
      {showGuidance && guidance && (
        <div className="space-y-4 animate-fadeIn">
          <VoiceAssistant text={speechText} />

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-brand-500" />
              <span className="text-sm font-medium text-brand-700">
                {cropName ? t(cropName) : ""} — {stageName ? t(stageName) : ""}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {t("irrigation.guidance")}
            </h3>
            <p className="text-gray-700 leading-relaxed">{guidance.guidance[lang]}</p>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
            <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 leading-relaxed">
              {t("irrigation.disclaimer")}
            </p>
          </div>

          {/* Feedback */}
          <Feedback page="irrigation" crop={selectedCrop} stage={selectedStage} />
        </div>
      )}

      {showGuidance && !guidance && (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
          <Info className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">{t("irrigation.selectPrompt")}</p>
        </div>
      )}
      </div>
    </div>
  );
}
