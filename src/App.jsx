import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollManager from "./components/ScrollManager";
import { LanguageProvider } from "./context/LanguageContext";
import AboutPage from "./pages/AboutPage";
import CategoryPage from "./pages/CategoryPage";
import ContactPage from "./pages/ContactPage";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import ServicePage from "./pages/ServicePage";
import ServicesPage from "./pages/ServicesPage";
import WhyPage from "./pages/WhyPage";

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollManager />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:categoryId" element={<CategoryPage />} />
            <Route path="/services/:categoryId/:serviceId" element={<ServicePage />} />
            <Route path="/why" element={<WhyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LanguageProvider>
  );
}
