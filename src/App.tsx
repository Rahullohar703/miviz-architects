import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import React, { Suspense } from "react";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const ArchitectsInPunePage = React.lazy(() => import("./pages/seo/ArchitectsInPunePage"));
const ResidentialArchitectsPunePage = React.lazy(() => import("./pages/seo/ResidentialArchitectsPunePage"));
const InteriorDesignersPunePage = React.lazy(() => import("./pages/seo/InteriorDesignersPunePage"));
const LuxuryVillaDesignPunePage = React.lazy(() => import("./pages/seo/LuxuryVillaDesignPunePage"));
const CommercialArchitectsPunePage = React.lazy(() => import("./pages/seo/CommercialArchitectsPunePage"));
const TurnkeyArchitecturePunePage = React.lazy(() => import("./pages/seo/TurnkeyArchitecturePunePage"));
const RestaurantInteriorDesignPunePage = React.lazy(() => import("./pages/seo/RestaurantInteriorDesignPunePage"));
const HouseConstructionCostPunePage = React.lazy(() => import("./pages/seo/HouseConstructionCostPunePage"));
const ArchitectFeesInPunePage = React.lazy(() => import("./pages/seo/ArchitectFeesInPunePage"));
const ModernLuxuryVillaDesignPune2026Page = React.lazy(() => import("./pages/seo/ModernLuxuryVillaDesignPune2026Page"));
const TurnkeyConstructionPune2026Page = React.lazy(() => import("./pages/seo/TurnkeyConstructionPune2026Page"));

const queryClient = new QueryClient();

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { duration: 0.3, ease: "easeOut" as const }
  }
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          {/* SEO Routes */}
          <Route path="/architects-in-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><ArchitectsInPunePage /></Suspense>} />
          <Route path="/residential-architects-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><ResidentialArchitectsPunePage /></Suspense>} />
          <Route path="/interior-designers-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><InteriorDesignersPunePage /></Suspense>} />
          <Route path="/luxury-villa-design-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><LuxuryVillaDesignPunePage /></Suspense>} />
          <Route path="/commercial-architects-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><CommercialArchitectsPunePage /></Suspense>} />
          <Route path="/turnkey-architecture-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><TurnkeyArchitecturePunePage /></Suspense>} />
          <Route path="/restaurant-interior-design-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><RestaurantInteriorDesignPunePage /></Suspense>} />
          <Route path="/house-construction-cost-pune-2026" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><HouseConstructionCostPunePage /></Suspense>} />
          <Route path="/architect-fees-in-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><ArchitectFeesInPunePage /></Suspense>} />
          <Route path="/modern-luxury-villa-design-pune-2026" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><ModernLuxuryVillaDesignPune2026Page /></Suspense>} />
          <Route path="/turnkey-construction-pune-2026" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><TurnkeyConstructionPune2026Page /></Suspense>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
