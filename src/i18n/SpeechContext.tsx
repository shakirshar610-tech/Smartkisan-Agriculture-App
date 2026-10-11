import {
  useState,
  useEffect,
  useCallback,
  useRef,
  createContext,
  useContext,
} from "react";
import type { ReactNode } from "react";

export type SpeechStatus = "idle" | "playing" | "paused" | "finished";

interface SpeechContextValue {
  status: SpeechStatus;
  speak: (text: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  isSupported: boolean;
}

const SpeechContext = createContext<SpeechContextValue | null>(null);

function findEnglishVoice(
  voiceList: SpeechSynthesisVoice[]
): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices =
    voiceList.length > 0 ? voiceList : window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  const enTags = ["en-us", "en-gb", "en-au", "en-in", "en"];

  for (const tag of enTags) {
    const match = voices.find(
      (v) => v.lang.toLowerCase().replace(/_/g, "-") === tag
    );
    if (match) return match;
  }

  for (const tag of enTags) {
    const match = voices.find((v) =>
      v.lang.toLowerCase().replace(/_/g, "-").startsWith(tag)
    );
    if (match) return match;
  }

  return null;
}

export function SpeechProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<SpeechStatus>("idle");
  const [voicesList, setVoicesList] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const keepAliveRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isSupported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    if (!isSupported) return;

    function loadVoices() {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setVoicesList(voices);
      }
    }

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    };
  }, [isSupported]);

  const clearKeepAlive = useCallback(() => {
    if (keepAliveRef.current) {
      clearInterval(keepAliveRef.current);
      keepAliveRef.current = null;
    }
  }, []);

  const startKeepAlive = useCallback(() => {
    clearKeepAlive();
    keepAliveRef.current = setInterval(() => {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      } else if (!window.speechSynthesis.speaking) {
        clearKeepAlive();
      }
    }, 10000);
  }, [clearKeepAlive]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    clearKeepAlive();
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setStatus("idle");
  }, [isSupported, clearKeepAlive]);

  const speak = useCallback(
    (text: string) => {
      if (!isSupported || !text.trim()) return;

      window.speechSynthesis.cancel();

      const voice = findEnglishVoice(voicesList);
      if (!voice) {
        setStatus("idle");
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voice;
      utterance.lang = voice.lang;
      utterance.rate = 0.85;

      utterance.onstart = () => setStatus("playing");
      utterance.onend = () => {
        clearKeepAlive();
        setStatus("finished");
        utteranceRef.current = null;
      };
      utterance.onerror = (event) => {
        clearKeepAlive();
        if (event.error !== "interrupted" && event.error !== "canceled") {
          setStatus("idle");
        }
        utteranceRef.current = null;
      };
      utterance.onpause = () => setStatus("paused");
      utterance.onresume = () => setStatus("playing");

      utteranceRef.current = utterance;
      setStatus("playing");
      window.speechSynthesis.speak(utterance);
      startKeepAlive();
    },
    [isSupported, voicesList, startKeepAlive, clearKeepAlive]
  );

  const pause = useCallback(() => {
    if (!isSupported) return;
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setStatus("paused");
    }
  }, [isSupported]);

  const resume = useCallback(() => {
    if (!isSupported) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setStatus("playing");
    }
  }, [isSupported]);

  useEffect(() => {
    return () => {
      clearKeepAlive();
      if (isSupported) window.speechSynthesis.cancel();
    };
  }, [isSupported, clearKeepAlive]);

  return (
    <SpeechContext.Provider
      value={{ status, speak, pause, resume, stop, isSupported }}
    >
      {children}
    </SpeechContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSpeech(): SpeechContextValue {
  const ctx = useContext(SpeechContext);
  if (!ctx) throw new Error("useSpeech must be used within SpeechProvider");
  return ctx;
}

export function isEnglishTTSAvailable(): boolean {
  if (typeof window === "undefined" || !window.speechSynthesis) return false;
  const voices = window.speechSynthesis.getVoices();
  return findEnglishVoice(voices) !== null;
}
