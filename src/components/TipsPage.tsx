import { useMemo } from "react";
import { Lightbulb } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { farmingTips } from "@/data/tips";
import { Icon } from "@/components/Icon";
import { VoiceAssistant } from "@/components/VoiceAssistant";

export function TipsPage() {
  const { lang, t } = useLang();

  const speechText = useMemo(() => {
    const parts: string[] = [];
    farmingTips.forEach((tip) => {
      parts.push(tip.title.en);
      parts.push(tip.description.en);
    });
    return parts.join(". ");
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F7F5] pb-24 lg:pb-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md flex-shrink-0">
          <Lightbulb className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {t("tips.title")}
          </h1>
          <p className="text-sm text-gray-500">{t("tips.subtitle")}</p>
        </div>
      </div>

      {/* Voice Assistant */}
      <div className="mb-6">
        <VoiceAssistant text={speechText} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {farmingTips.map((tip, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                <Icon name={tip.icon} className="w-6 h-6 text-teal-700" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1.5">
                  {tip.title[lang]}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {tip.description[lang]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
