import { Volume2, Square, Pause, Play } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { useSpeech } from "@/i18n/SpeechContext";

interface VoiceAssistantProps {
  text: string;
  label?: string;
}

export function VoiceAssistant({ text, label }: VoiceAssistantProps) {
  const { lang, t } = useLang();
  const { status, speak, pause, resume, stop, isSupported } = useSpeech();

  // Only render for English — no TTS for Urdu or Sindhi
  if (lang !== "en" || !isSupported || !text.trim()) {
    return null;
  }

  const isPlaying = status === "playing";
  const isPaused = status === "paused";

  function handlePlay() {
    if (isPaused) {
      resume();
    } else {
      speak(text);
    }
  }

  function handleStop() {
    stop();
  }

  function handlePause() {
    pause();
  }

  return (
    <div className="flex items-center gap-2 p-3 rounded-xl bg-brand-50 border border-brand-100">
      <Volume2 className="w-5 h-5 text-brand-600 flex-shrink-0" />

      <span className="text-sm text-brand-800 flex-1">
        {label || t("voice.listen")}
      </span>

      <div className="flex items-center gap-1.5">
        {!isPlaying && !isPaused && (
          <button
            onClick={handlePlay}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500 text-white text-xs font-medium hover:bg-brand-600 transition-colors"
          >
            <Play className="w-3.5 h-3.5" />
            {t("voice.listen")}
          </button>
        )}

        {isPlaying && (
          <>
            <button
              onClick={handlePause}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-200 text-gray-700 text-xs font-medium hover:bg-gray-300 transition-colors"
            >
              <Pause className="w-3.5 h-3.5" />
              {t("voice.pause")}
            </button>
            <button
              onClick={handleStop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-100 text-red-700 text-xs font-medium hover:bg-red-200 transition-colors"
            >
              <Square className="w-3.5 h-3.5" />
              {t("voice.stop")}
            </button>
          </>
        )}

        {isPaused && (
          <>
            <button
              onClick={handlePlay}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500 text-white text-xs font-medium hover:bg-brand-600 transition-colors"
            >
              <Play className="w-3.5 h-3.5" />
              {t("voice.resume")}
            </button>
            <button
              onClick={handleStop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-100 text-red-700 text-xs font-medium hover:bg-red-200 transition-colors"
            >
              <Square className="w-3.5 h-3.5" />
              {t("voice.stop")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
