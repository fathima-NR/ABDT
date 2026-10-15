import { useI18n } from "../context/LanguageContext";
import Navbar from "./Navbar";
import TopBar from "./TopBar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import WelcomeSplash from "./WelcomeSplash";

export default function Layout({ children }) {
  const { t } = useI18n();

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-navy"
      >
        {t.nav.skip}
      </a>
      <header className="sticky top-0 z-50">
        <TopBar />
        <Navbar />
        <div className="flex h-1" aria-hidden="true">
          <span className="flex-1 bg-uae-green" />
          <span className="w-10 bg-white" />
          <span className="flex-1 bg-black" />
          <span className="flex-1 bg-uae-red" />
        </div>
      </header>
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <WelcomeSplash />
    </div>
  );
}
