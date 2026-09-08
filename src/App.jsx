import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import ProblemSection from './components/ProblemSection/ProblemSection';
import SystemMap from './components/SystemMap/SystemMap';
import ProductShowcase from './components/ProductShowcase/ProductShowcase';
import Products from './components/Products/Products';
import PricingComparison from './components/PricingComparison/PricingComparison';
import ProductPreview from './components/ProductPreview/ProductPreview';
import PremiumSection from './components/PremiumSection/PremiumSection';
import HowItWorks from './components/HowItWorks/HowItWorks';
import RoleTracks from './components/RoleTracks/RoleTracks';
import TargetAudience from './components/TargetAudience/TargetAudience';
import FAQ from './components/FAQ/FAQ';
import FinalCTA from './components/FinalCTA/FinalCTA';
import Footer from './components/Footer/Footer';
import ScrollReveal from './components/ScrollReveal/ScrollReveal';

import { CheckoutProvider } from './context/CheckoutContext';
import Success from './pages/Success';
import Failed from './pages/Failed';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Refund from './pages/Refund';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';

const Home = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <ScrollReveal><ProductShowcase /></ScrollReveal>
      <ScrollReveal><ProblemSection /></ScrollReveal>
      <ScrollReveal><SystemMap /></ScrollReveal>
      <ScrollReveal><Products /></ScrollReveal>
      <ScrollReveal><PricingComparison /></ScrollReveal>
      <ScrollReveal><ProductPreview /></ScrollReveal>
      <ScrollReveal><PremiumSection /></ScrollReveal>
      <ScrollReveal><HowItWorks /></ScrollReveal>
      <ScrollReveal><RoleTracks /></ScrollReveal>
      <ScrollReveal><TargetAudience /></ScrollReveal>
      <ScrollReveal><FAQ /></ScrollReveal>
      <ScrollReveal><FinalCTA /></ScrollReveal>
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <CheckoutProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment-success" element={<Success />} />
        <Route path="/payment-failed" element={<Failed />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/refund-policy" element={<Refund />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </CheckoutProvider>
  );
}

export default App;
