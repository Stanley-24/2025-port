import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Services from "./pages/Services";
import PaymentResult from "./pages/PaymentResult";
import RouteScrollHandler from "./components/RouteScrollHandler";
import { SpeedInsights } from '@vercel/speed-insights/react';


function App() {

  return (
    <>
      <RouteScrollHandler />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/payment-success" element={<PaymentResult />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ScrollToTop />
      <SpeedInsights />
    </> 
  )
}

export default App
