import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Scenarios from "./pages/Scenarios";
import Compare from "./pages/Compare";
import Run from "./pages/Run";
import Diff from "./pages/Diff";
import Summary from "./pages/Summary";
import Export from "./pages/Export";
import Spec from "./pages/Spec";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/scenarios" element={<Scenarios />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/run" element={<Run />} />
          <Route path="/diff" element={<Diff />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/export" element={<Export />} />
          <Route path="/spec" element={<Spec />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
