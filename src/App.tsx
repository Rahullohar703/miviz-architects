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
const ArchitectFeesInPune2026Page = React.lazy(() => import("./pages/seo/ArchitectFeesInPune2026Page"));
const ModernLuxuryVillaDesignPune2026Page = React.lazy(() => import("./pages/seo/ModernLuxuryVillaDesignPune2026Page"));
const TurnkeyConstructionPune2026Page = React.lazy(() => import("./pages/seo/TurnkeyConstructionPune2026Page"));
const TurnkeyVsTraditionalConstructionPune2026Page = React.lazy(() => import("./pages/seo/TurnkeyVsTraditionalConstructionPune2026Page"));
const MistakesBuildingHomePune2026Page = React.lazy(() => import("./pages/seo/MistakesBuildingHomePune2026Page"));
const ArchitectureVsInteriorDesignPune2026Page = React.lazy(() => import("./pages/seo/ArchitectureVsInteriorDesignPune2026Page"));
const HousePlansSmallPlotsPune2026Page = React.lazy(() => import("./pages/seo/HousePlansSmallPlotsPune2026Page"));
const ModernVastuTipsHomesPune2026Page = React.lazy(() => import("./pages/seo/ModernVastuTipsHomesPune2026Page"));
const HomeConstructionTimelinePune2026Page = React.lazy(() => import("./pages/seo/HomeConstructionTimelinePune2026Page"));
const TopTenArchitectsInPunePage = React.lazy(() => import("./pages/seo/TopTenArchitectsInPunePage"));
const GoodArchitectsInPunePage = React.lazy(() => import("./pages/seo/GoodArchitectsInPunePage"));
const ArchitectureFirmInPunePage = React.lazy(() => import("./pages/seo/ArchitectureFirmInPunePage"));
const Top10ArchitectsInPunePage = React.lazy(() => import("./pages/seo/Top10ArchitectsInPunePage"));
const AffordableArchitectNearMePage = React.lazy(() => import("./pages/seo/AffordableArchitectNearMePage"));
const BestArchitectNearMePage = React.lazy(() => import("./pages/seo/BestArchitectNearMePage"));
const HomeInteriorDesignerPunePage = React.lazy(() => import("./pages/seo/HomeInteriorDesignerPunePage"));
const Top10InteriorDesignersInPunePage = React.lazy(() => import("./pages/seo/Top10InteriorDesignersInPunePage"));
const TopInteriorDesignersInPunePage = React.lazy(() => import("./pages/seo/TopInteriorDesignersInPunePage"));
const BestInteriorDecoratorsInPunePage = React.lazy(() => import("./pages/seo/BestInteriorDecoratorsInPunePage"));
const BestInteriorsInPunePage = React.lazy(() => import("./pages/seo/BestInteriorsInPunePage"));
const GoodInteriorDesignersInPunePage = React.lazy(() => import("./pages/seo/GoodInteriorDesignersInPunePage"));
const BestInteriorDesignerInPunePage = React.lazy(() => import("./pages/seo/BestInteriorDesignerInPunePage"));
const ArchitectsInBanerPunePage = React.lazy(() => import("./pages/seo/ArchitectsInBanerPunePage"));
const ArchitectsInKoregaonParkPunePage = React.lazy(() => import("./pages/seo/ArchitectsInKoregaonParkPunePage"));
const ArchitectsInKalyaniNagarPunePage = React.lazy(() => import("./pages/seo/ArchitectsInKalyaniNagarPunePage"));
const ArchitectsInAundhPunePage = React.lazy(() => import("./pages/seo/ArchitectsInAundhPunePage"));
const ArchitectsInBoatClubRoadPunePage = React.lazy(() => import("./pages/seo/ArchitectsInBoatClubRoadPunePage"));
const ArchitectsInPashanPunePage = React.lazy(() => import("./pages/seo/ArchitectsInPashanPunePage"));
const ArchitectsInVimanNagarPunePage = React.lazy(() => import("./pages/seo/ArchitectsInVimanNagarPunePage"));
const ArchitectsInKharadiPunePage = React.lazy(() => import("./pages/seo/ArchitectsInKharadiPunePage"));
const InteriorDesignersInKoregaonParkPunePage = React.lazy(() => import("./pages/seo/InteriorDesignersInKoregaonParkPunePage"));
const InteriorDesignersInBanerPunePage = React.lazy(() => import("./pages/seo/InteriorDesignersInBanerPunePage"));
const ArchitectsInBavdhanPunePage = React.lazy(() => import("./pages/seo/ArchitectsInBavdhanPunePage"));
const ElevationDesignMistakesToAvoidPage = React.lazy(() => import("./pages/seo/ElevationDesignMistakesToAvoidPage"));
const ThingsToMakeKitchenPremiumPage = React.lazy(() => import("./pages/seo/ThingsToMakeKitchenPremiumPage"));
const ThingsToMakeVillaPremiumPage = React.lazy(() => import("./pages/seo/ThingsToMakeVillaPremiumPage"));
const ThreeInteriorStylesPage = React.lazy(() => import("./pages/seo/ThreeInteriorStylesPage"));
const ElderlyParentsBedroomDesignPage = React.lazy(() => import("./pages/seo/ElderlyParentsBedroomDesignPage"));


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
          <Route path="/architect-fees-in-pune-2026" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><ArchitectFeesInPune2026Page /></Suspense>} />
          <Route path="/modern-luxury-villa-design-pune-2026" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><ModernLuxuryVillaDesignPune2026Page /></Suspense>} />
          <Route path="/turnkey-construction-pune-2026" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><TurnkeyConstructionPune2026Page /></Suspense>} />
          <Route path="/turnkey-vs-traditional-construction-pune-2026" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><TurnkeyVsTraditionalConstructionPune2026Page /></Suspense>} />
          <Route path="/15-mistakes-building-home-pune-2026" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><MistakesBuildingHomePune2026Page /></Suspense>} />
          <Route path="/architecture-vs-interior-design-pune-2026" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><ArchitectureVsInteriorDesignPune2026Page /></Suspense>} />
          <Route path="/house-plans-small-plots-pune-2026" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><HousePlansSmallPlotsPune2026Page /></Suspense>} />
          <Route path="/modern-vastu-tips-homes-pune-2026" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><ModernVastuTipsHomesPune2026Page /></Suspense>} />
          <Route path="/home-construction-timeline-pune-2026" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><HomeConstructionTimelinePune2026Page /></Suspense>} />
          <Route path="/top-ten-architects-in-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><TopTenArchitectsInPunePage /></Suspense>} />
          <Route path="/good-architects-in-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><GoodArchitectsInPunePage /></Suspense>} />
          <Route path="/architecture-firm-in-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><ArchitectureFirmInPunePage /></Suspense>} />
          <Route path="/top-10-architects-in-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><Top10ArchitectsInPunePage /></Suspense>} />
          <Route path="/affordable-architect-near-me" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><AffordableArchitectNearMePage /></Suspense>} />
          <Route path="/best-architect-near-me" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><BestArchitectNearMePage /></Suspense>} />
          <Route path="/home-interior-designer-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><HomeInteriorDesignerPunePage /></Suspense>} />
          <Route path="/top-10-interior-designers-in-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><Top10InteriorDesignersInPunePage /></Suspense>} />
          <Route path="/top-interior-designers-in-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><TopInteriorDesignersInPunePage /></Suspense>} />
          <Route path="/best-interior-decorators-in-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><BestInteriorDecoratorsInPunePage /></Suspense>} />
          <Route path="/best-interiors-in-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><BestInteriorsInPunePage /></Suspense>} />
          <Route path="/good-interior-designers-in-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><GoodInteriorDesignersInPunePage /></Suspense>} />
          <Route path="/best-interior-designer-in-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><BestInteriorDesignerInPunePage /></Suspense>} />
          <Route path="/architects-in-baner-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><ArchitectsInBanerPunePage /></Suspense>} />
          <Route path="/architects-in-koregaon-park-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><ArchitectsInKoregaonParkPunePage /></Suspense>} />
          <Route path="/architects-in-kalyani-nagar-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><ArchitectsInKalyaniNagarPunePage /></Suspense>} />

          <Route path="/architects-in-bavdhan-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><ArchitectsInBavdhanPunePage /></Suspense>} />
          <Route path="/architects-in-aundh-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><ArchitectsInAundhPunePage /></Suspense>} />
          <Route path="/architects-in-boat-club-road-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><ArchitectsInBoatClubRoadPunePage /></Suspense>} />
          <Route path="/architects-in-pashan-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><ArchitectsInPashanPunePage /></Suspense>} />
          <Route path="/architects-in-viman-nagar-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><ArchitectsInVimanNagarPunePage /></Suspense>} />
          <Route path="/architects-in-kharadi-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><ArchitectsInKharadiPunePage /></Suspense>} />
          <Route path="/interior-designers-in-koregaon-park-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><InteriorDesignersInKoregaonParkPunePage /></Suspense>} />
          <Route path="/interior-designers-in-baner-pune" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><InteriorDesignersInBanerPunePage /></Suspense>} />
          <Route path="/elevation-design-mistakes-to-avoid" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><ElevationDesignMistakesToAvoidPage /></Suspense>} />
          <Route path="/3-things-to-make-kitchen-premium" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><ThingsToMakeKitchenPremiumPage /></Suspense>} />
          <Route path="/3-things-to-make-villa-premium" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><ThingsToMakeVillaPremiumPage /></Suspense>} />
          <Route path="/3-interior-styles-youve-never-heard-of" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><ThreeInteriorStylesPage /></Suspense>} />
          <Route path="/elderly-parents-bedroom-design" element={<Suspense fallback={<div className="min-h-screen bg-background" />}><ElderlyParentsBedroomDesignPage /></Suspense>} />
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

