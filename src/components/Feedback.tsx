import { useState } from "react";
import { ThumbsUp, ThumbsDown, CheckCircle2, Loader2 } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { supabase } from "@/lib/supabase";

interface FeedbackProps {
  page: string;
  crop?: string;
  stage?: string;
  symptom?: string;
}

export function Feedback({ page, crop, stage, symptom }: FeedbackProps) {
  const { lang, t } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(helpful: boolean) {
    if (loading || submitted) return;
    setLoading(true);
    setError(false);

    try {
      const { error: insertError } = await supabase.from("feedback").insert({
        page,
        crop: crop ?? null,
        stage: stage ?? null,
        symptom: symptom ?? null,
        language: lang,
        helpful,
      });

      if (insertError) throw insertError;
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200">
        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
        <p className="text-sm font-medium text-green-800">{t("feedback.thanks")}</p>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
      <p className="text-sm font-medium text-gray-800 mb-3">{t("feedback.question")}</p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleSubmit(true)}
          disabled={loading}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 text-white font-medium text-sm hover:bg-green-700 active:bg-green-800 transition-colors disabled:opacity-50 min-h-[44px]"
        >
          <ThumbsUp className="w-4 h-4" />
          {t("feedback.yes")}
        </button>
        <button
          onClick={() => handleSubmit(false)}
          disabled={loading}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-300 active:bg-gray-400 transition-colors disabled:opacity-50 min-h-[44px]"
        >
          <ThumbsDown className="w-4 h-4" />
          {t("feedback.no")}
        </button>
        {loading && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
      </div>
      {error && (
        <p className="mt-2 text-xs text-red-600">{t("feedback.error")}</p>
      )}
    </div>
  );
}
