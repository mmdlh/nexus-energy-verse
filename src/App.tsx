import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MainLayout from "@/components/MainLayout";
import OverviewPage from "@/pages/OverviewPage";
import GenerationPage from "@/pages/GenerationPage";
import StoragePage from "@/pages/StoragePage";
import LoadPage from "@/pages/LoadPage";
import GridPage from "@/pages/GridPage";
import EquipmentPage from "@/pages/EquipmentPage";
import EfficiencyPage from "@/pages/EfficiencyPage";
import AlertsPage from "@/pages/AlertsPage";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/generation" element={<GenerationPage />} />
            <Route path="/storage" element={<StoragePage />} />
            <Route path="/load" element={<LoadPage />} />
            <Route path="/grid" element={<GridPage />} />
            <Route path="/equipment" element={<EquipmentPage />} />
            <Route path="/efficiency" element={<EfficiencyPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
