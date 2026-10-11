import { useState } from "react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { SpeechProvider } from "@/i18n/SpeechContext";
import { AuthProvider } from "@/i18n/AuthContext";
import { Header, type PageId } from "@/components/Header";
import { HomePage } from "@/components/HomePage";
import { CropInfoPage } from "@/components/CropInfoPage";
import { CropDetailPage } from "@/components/CropDetailPage";
import { IrrigationPage } from "@/components/IrrigationPage";
import { ProblemGuidePage } from "@/components/ProblemGuidePage";
import { MyAdvisoryPage } from "@/components/MyAdvisoryPage";
import { TipsPage } from "@/components/TipsPage";
import { FarmNotesPage } from "@/components/FarmNotesPage";
import { AboutPage, Footer } from "@/components/AboutPage";
import { AuthPage } from "@/components/AuthPage";

function App() {
  const [currentPage, setCurrentPage] = useState<PageId>("home");
  const [selectedCropId, setSelectedCropId] = useState<string>("");

  function handleNavigate(page: PageId) {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSelectCrop(cropId: string) {
    setSelectedCropId(cropId);
    setCurrentPage("cropDetail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderPage() {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} onSelectCrop={handleSelectCrop} />;
      case "crops":
        return <CropInfoPage onSelectCrop={handleSelectCrop} />;
      case "cropDetail":
        return (
          <CropDetailPage
            cropId={selectedCropId}
            onNavigate={handleNavigate}
            onBack={() => handleNavigate("home")}
          />
        );
      case "irrigation":
        return <IrrigationPage />;
      case "problems":
        return <ProblemGuidePage />;
      case "advisory":
        return <MyAdvisoryPage />;
      case "tips":
        return <TipsPage />;
      case "notes":
        return <FarmNotesPage />;
      case "about":
        return <AboutPage />;
      case "auth":
        return <AuthPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} onSelectCrop={handleSelectCrop} />;
    }
  }

  return (
    <LanguageProvider>
      <AuthProvider>
        <SpeechProvider>
          <div className="min-h-screen flex flex-col bg-[#F5F7F5]">
            <Header currentPage={currentPage} onNavigate={handleNavigate} />
            <main className="flex-1">{renderPage()}</main>
            <Footer />
          </div>
        </SpeechProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
