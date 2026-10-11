import { useState, useMemo } from "react";
import {
  Bug,
  AlertTriangle,
  Info,
  ArrowRight,
  Phone,
  ChevronDown,
} from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { symptomGuides } from "@/data/problems";
import { VoiceAssistant } from "@/components/VoiceAssistant";
import { Feedback } from "@/components/Feedback";

export function ProblemGuidePage() {
  const { lang, t, isRTL } = useLang();
  const [selectedSymptom, setSelectedSymptom] = useState<string>("");

  const guide = symptomGuides.find((g) => g.id === selectedSymptom);

  const speechText = useMemo(() => {
    if (!guide) return "";
    const parts: string[] = [];
    parts.push(t(guide.labelKey));
    parts.push(t("problems.possibleCauses"));
    guide.causes.forEach((c) => parts.push(c.en));
    parts.push(t("problems.nextSteps"));
    guide.nextSteps.forEach((s) => parts.push(s.en));
    return parts.join(". ");
  }, [guide, t]);

  return (
    <div className="min-h-screen bg-[#F5F7F5] pb-24 lg:pb-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md flex-shrink-0">
          <Bug className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {t("problems.title")}
          </h1>
          <p className="text-sm text-gray-500">{t("problems.subtitle")}</p>
        </div>
      </div>

      {/* Symptom selector */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("problems.selectLabel")}
        </label>
        <div className="relative">
          <select
            value={selectedSymptom}
            onChange={(e) => setSelectedSymptom(e.target.value)}
            className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent text-base appearance-none"
          >
            <option value="">{t("common.select")}</option>
            {symptomGuides.map((g) => (
              <option key={g.id} value={g.id}>
                {t(g.labelKey)}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* No selection prompt */}
      {!guide && (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
          <Info className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">{t("problems.selectPrompt")}</p>
        </div>
      )}

      {/* Guide display */}
      {guide && (
        <div className="space-y-4 animate-fadeIn">
          <VoiceAssistant text={speechText} />

          {/* Possible Causes */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              {t("problems.possibleCauses")}
            </h3>
            <ul className="space-y-3">
              {guide.causes.map((cause, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-amber-50/60 border border-amber-100">
                  <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {cause[lang]}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ArrowRight
                className={`w-5 h-5 text-brand-500 ${isRTL ? "rotate-180" : ""}`}
              />
              {t("problems.nextSteps")}
            </h3>
            <ul className="space-y-3">
              {guide.nextSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-brand-50/60 border border-brand-100">
                  <span className="w-6 h-6 rounded-full bg-brand-200 text-brand-800 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {step[lang]}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact expert CTA */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand-50 border border-brand-200">
            <Phone className="w-5 h-5 text-brand-700 flex-shrink-0" />
            <p className="text-sm font-medium text-brand-800">
              {t("problems.contactExpert")}
            </p>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
            <Info className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800 leading-relaxed">
              {t("problems.disclaimer")}
            </p>
          </div>

          {/* Feedback */}
          <Feedback page="problems" symptom={selectedSymptom} />
        </div>
      )}
      </div>
    </div>
  );
}
