import { useState, useEffect, useRef } from "react";
import {
  Leaf,
  ChevronDown,
  Menu,
  X,
  Globe,
  Home,
  Sprout,
  ClipboardList,
  StickyNote,
  Info,
  LogIn,
  LogOut,
} from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { useAuth } from "@/i18n/AuthContext";
import { LANGUAGES, type Language } from "@/i18n/translations";

export type PageId =
  | "home"
  | "crops"
  | "cropDetail"
  | "irrigation"
  | "problems"
  | "advisory"
  | "tips"
  | "notes"
  | "about"
  | "auth";

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const { lang, setLang, t, isRTL } = useLang();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const desktopNavItems: { id: PageId; label: string }[] = [
    { id: "home", label: t("nav.home") },
    { id: "crops", label: t("nav.crops") },
    { id: "irrigation", label: t("nav.irrigation") },
    { id: "problems", label: t("nav.problems") },
    { id: "advisory", label: t("nav.advisory") },
    { id: "notes", label: t("nav.notes") },
    { id: "tips", label: t("nav.tips") },
    { id: "about", label: t("nav.about") },
  ];

  const bottomNavItems: { id: PageId; label: string; icon: typeof Home }[] = [
    { id: "home", label: t("nav.home"), icon: Home },
    { id: "crops", label: t("nav.myfarm"), icon: Sprout },
    { id: "advisory", label: t("nav.advisory"), icon: ClipboardList },
    { id: "notes", label: t("nav.notes"), icon: StickyNote },
    { id: "about", label: t("nav.about"), icon: Info },
  ];

  function handleNav(page: PageId) {
    onNavigate(page);
    setMobileMenuOpen(false);
  }

  function handleLangSelect(language: Language) {
    setLang(language);
    setLangMenuOpen(false);
  }

  const currentLang = LANGUAGES.find((l) => l.code === lang);

  async function handleSignOut() {
    const { error } = await signOut();
    if (error) {
      console.error("Sign out failed:", error);
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => handleNav("home")}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-lg font-bold text-brand-700 leading-tight">
                  {t("appName")}
                </h1>
                <p className="text-[10px] text-brand-500 leading-tight hidden sm:block">
                  {t("appTagline")}
                </p>
              </div>
            </button>

            <nav className="hidden lg:flex items-center gap-1">
              {desktopNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? "bg-brand-50 text-brand-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {/* Auth button */}
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors text-sm font-medium text-gray-700 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">{t("auth.signOut")}</span>
                </button>
              ) : (
                <button
                  onClick={() => handleNav("auth")}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-colors text-sm font-medium ${
                    currentPage === "auth"
                      ? "border-brand-300 bg-brand-50 text-brand-700"
                      : "border-gray-200 hover:border-brand-300 hover:bg-brand-50 text-gray-700"
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">{t("auth.signIn")}</span>
                </button>
              )}

              <div className="relative" ref={langMenuRef}>
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 hover:border-brand-300 hover:bg-brand-50 transition-colors text-sm font-medium text-gray-700"
                >
                  <Globe className="w-4 h-4 text-brand-500" />
                  <span className="hidden sm:inline">{currentLang?.nativeLabel}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${langMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {langMenuOpen && (
                  <div
                    className={`absolute mt-2 w-44 rounded-xl bg-white border border-gray-200 shadow-lg overflow-hidden ${isRTL ? "left-0" : "right-0"}`}
                  >
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => handleLangSelect(l.code)}
                        className={`w-full px-4 py-2.5 text-left text-sm hover:bg-brand-50 transition-colors flex items-center justify-between ${
                          lang === l.code
                            ? "bg-brand-50 text-brand-700 font-semibold"
                            : "text-gray-700"
                        }`}
                      >
                        <span>{l.nativeLabel}</span>
                        <span className="text-xs text-gray-400">{l.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-700" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav className="lg:hidden pb-4 grid grid-cols-2 gap-2 border-t border-brand-100 pt-3">
              {desktopNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${
                    currentPage === item.id
                      ? "bg-brand-50 text-brand-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-brand-100 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-around px-2 py-1.5 safe-area-inset-bottom">
          {bottomNavItems.map((item) => {
            const NavIcon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg transition-colors min-w-[60px] ${
                  isActive ? "text-brand-600" : "text-gray-400"
                }`}
              >
                <NavIcon
                  className={`w-5 h-5 ${isActive ? "fill-brand-50" : ""}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className={`text-[10px] font-medium ${isActive ? "font-semibold" : ""}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
