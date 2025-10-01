import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ServiceMenu from "./pages/ServiceMenu";
import Appointments from "./pages/Appointments";
import ServiceStatus from "./pages/ServiceStatus";
import Trade from "./pages/Trade";
import Checkin from "./pages/Checkin";
import Loyalty from "./pages/Loyalty";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Service menu and feature routes */}
          <Route path="/menu" element={<ServiceMenu />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/status" element={<ServiceStatus />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/checkin" element={<Checkin />} />
          <Route path="/loyalty" element={<Loyalty />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
