import { Info, Heart, Leaf, ShieldAlert, BookOpen } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

export function AboutPage() {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-[#F5F7F5] pb-24 lg:pb-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md flex-shrink-0">
          <Info className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          {t("about.title")}
        </h1>
      </div>

      <div className="space-y-6">
        {/* Problem */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            {t("about.problem")}
          </h3>
          <p className="text-gray-700 leading-relaxed">{t("about.problemText")}</p>
        </div>

        {/* Solution */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-brand-600" />
            {t("about.solution")}
          </h3>
          <p className="text-gray-700 leading-relaxed">{t("about.solutionText")}</p>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-3 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-700" />
            {t("disclaimer.title")}
          </h3>
          <p className="text-amber-800 leading-relaxed">{t("disclaimer.text")}</p>
        </div>

        {/* References */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-600" />
            {t("references.title")}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4">{t("references.intro")}</p>
          <ul className="space-y-2.5">
            {["references.item1", "references.item2", "references.item3", "references.item4"].map((key) => (
              <li key={key} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0 mt-2" />
                <p className="text-sm text-gray-700 leading-relaxed">{t(key)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </div>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-brand-800 text-brand-100 mt-auto lg:block hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-brand-200" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">{t("appName")}</p>
              <p className="text-xs text-brand-300">{t("appTagline")}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-brand-200">
            <Heart className="w-4 h-4 text-brand-300" />
            <span>{t("footer.madeWith")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
