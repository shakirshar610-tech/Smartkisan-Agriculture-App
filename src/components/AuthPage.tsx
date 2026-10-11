import { useState } from "react";
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowLeft, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "@/i18n/AuthContext";
import { useLang } from "@/i18n/LanguageContext";
import type { PageId } from "@/components/Header";

type AuthMode = "login" | "signup" | "forgot";

interface AuthPageProps {
  onNavigate: (page: PageId) => void;
}

export function AuthPage({ onNavigate }: AuthPageProps) {
  const { signIn, signUp, resetPassword } = useAuth();
  const { t, isRTL } = useLang();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function resetState() {
    setError(null);
    setSuccess(null);
  }

  function switchMode(newMode: AuthMode) {
    setMode(newMode);
    resetState();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    resetState();
    setSubmitting(true);

    try {
      if (mode === "login") {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error);
        } else {
          onNavigate("home");
        }
      } else if (mode === "signup") {
        const { error, needsConfirmation } = await signUp(email, password);
        if (error) {
          setError(error);
        } else if (needsConfirmation) {
          setSuccess(t("auth.confirmationRequired"));
          setMode("login");
          setPassword("");
        } else {
          setSuccess(t("auth.accountCreated"));
          setMode("login");
          setPassword("");
        }
      } else if (mode === "forgot") {
        const { error } = await resetPassword(email);
        if (error) {
          setError(error);
        } else {
          setSuccess(t("auth.resetSent"));
        }
      }
    } catch {
      setError(t("auth.genericError"));
    } finally {
      setSubmitting(false);
    }
  }

  const title =
    mode === "login" ? t("auth.signIn") : mode === "signup" ? t("auth.createAccount") : t("auth.resetPassword");

  const submitLabel =
    mode === "login" ? t("auth.submitSignIn") : mode === "signup" ? t("auth.submitSignUp") : t("auth.submitReset");

  return (
    <div className="min-h-screen bg-[#F5F7F5] flex items-center justify-center px-4 py-12 pb-28 lg:pb-12">
      <div className="w-full max-w-md">
        {/* Back button */}
        <button
          onClick={() => onNavigate("home")}
          className={`flex items-center gap-2 text-sm text-gray-500 hover:text-brand-700 transition-colors mb-6 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <ArrowLeft className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
          {t("auth.backToHome")}
        </button>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          {/* Logo + title */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md mb-3">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-500 mt-1 text-center">
              {mode === "login" && t("auth.signInSubtitle")}
              {mode === "signup" && t("auth.signUpSubtitle")}
              {mode === "forgot" && t("auth.forgotSubtitle")}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 mb-4">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-brand-50 border border-brand-200 mb-4">
              <CheckCircle className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-brand-800">{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {t("auth.email")}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="farmer@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                />
              </div>
            </div>

            {mode !== "forgot" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {t("auth.password")}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("auth.passwordPlaceholder")}
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-500 text-white font-semibold text-sm hover:bg-brand-600 transition-colors shadow-md disabled:opacity-60 min-h-[48px]"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {submitting ? t("auth.pleaseWait") : submitLabel}
            </button>
          </form>

          {/* Mode switch links */}
          <div className="mt-5 space-y-2 text-center">
            {mode === "login" && (
              <>
                <p className="text-sm text-gray-500">
                  {t("auth.noAccount")}{" "}
                  <button
                    onClick={() => switchMode("signup")}
                    className="text-brand-600 font-medium hover:text-brand-700"
                  >
                    {t("auth.signUp")}
                  </button>
                </p>
                <button
                  onClick={() => switchMode("forgot")}
                  className="text-sm text-gray-500 hover:text-brand-600 transition-colors"
                >
                  {t("auth.forgotPassword")}
                </button>
              </>
            )}

            {mode === "signup" && (
              <p className="text-sm text-gray-500">
                {t("auth.haveAccount")}{" "}
                <button
                  onClick={() => switchMode("login")}
                  className="text-brand-600 font-medium hover:text-brand-700"
                >
                  {t("auth.signIn")}
                </button>
              </p>
            )}

            {mode === "forgot" && (
              <p className="text-sm text-gray-500">
                {t("auth.rememberPassword")}{" "}
                <button
                  onClick={() => switchMode("login")}
                  className="text-brand-600 font-medium hover:text-brand-700"
                >
                  {t("auth.backToSignIn")}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
