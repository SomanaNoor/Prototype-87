import React from "react";
//import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import { HashRouter, Routes as RouterRoutes, Route } from "react-router-dom";

import ScrollToTop from "@/components/ScrollToTop";
import ErrorBoundary from "@/components/ErrorBoundary";
import NotFound from "@/pages/NotFound";
import GlobalDisasterOverview from "@/pages/global-disaster-overview";
import RiskAssessmentHub from "@/pages/risk-assessment-hub";
import InfrastructureImpact from "@/pages/infrastructure-impact";
import PopulationDisplacement from "@/pages/population-displacement";
/*
import GlobalDisasterOverview from './pages/global-disaster-overview';
import RiskAssessmentHub from './pages/risk-assessment-hub';
import InfrastructureImpact from './pages/infrastructure-impact';
import PopulationDisplacement from './pages/population-displacement';*/

const Routes = () => {
  return (
    <HashRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<GlobalDisasterOverview />} />
        <Route path="/global-disaster-overview" element={<GlobalDisasterOverview />} />
        <Route path="/risk-assessment-hub" element={<RiskAssessmentHub />} />
        <Route path="/infrastructure-impact" element={<InfrastructureImpact />} />
        <Route path="/population-displacement" element={<PopulationDisplacement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </HashRouter>
  );
};

export default Routes;
