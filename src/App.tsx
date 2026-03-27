import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/layout";

// Eagerly load the landing page (first paint)
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";

// Lazy-load all other pages for code splitting
const Scenarios = lazy(() => import("./pages/Scenarios"));
const Matrix = lazy(() => import("./pages/Matrix"));
const Compare = lazy(() => import("./pages/Compare"));
const Run = lazy(() => import("./pages/Run"));
const Diff = lazy(() => import("./pages/Diff"));
const Summary = lazy(() => import("./pages/Summary"));
const Export = lazy(() => import("./pages/Export"));
const Spec = lazy(() => import("./pages/Spec"));
const PolicyBank = lazy(() => import("./pages/PolicyBank"));
const TestSuite = lazy(() => import("./pages/TestSuite"));
const Playground = lazy(() => import("./pages/Playground"));

// Learn pages
const LearnIndex = lazy(() => import("./pages/learn/index"));
const QuickStart = lazy(() => import("./pages/learn/QuickStart"));
const ByExample = lazy(() => import("./pages/learn/ByExample"));
const Concepts = lazy(() => import("./pages/learn/Concepts"));

// Library pages
const LibraryIndex = lazy(() => import("./pages/library/index"));
const ReasonCodes = lazy(() => import("./pages/library/ReasonCodes"));
const Agents = lazy(() => import("./pages/library/Agents"));

// Visualization demo
const VisualizationDemo = lazy(() => import("./pages/VisualizationDemo"));

const queryClient = new QueryClient();

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        className="min-h-screen"
      >
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes location={location}>
            <Route path="/" element={<Landing />} />
            
            {/* Learn Routes */}
            <Route path="/learn" element={<LearnIndex />} />
            <Route path="/learn/quick-start" element={<QuickStart />} />
            <Route path="/learn/by-example" element={<ByExample />} />
            <Route path="/learn/concepts" element={<Concepts />} />
            
            {/* Library Routes */}
            <Route path="/library" element={<LibraryIndex />} />
            <Route path="/library/policies" element={<PolicyBank />} />
            <Route path="/library/scenarios" element={<Scenarios />} />
            <Route path="/library/reason-codes" element={<ReasonCodes />} />
            <Route path="/library/agents" element={<Agents />} />
            
            {/* Demo Flow */}
            <Route path="/scenarios" element={<Scenarios />} />
            <Route path="/policies" element={<PolicyBank />} />
            <Route path="/matrix" element={<Matrix />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/run" element={<Run />} />
            <Route path="/diff" element={<Diff />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/export" element={<Export />} />
            
            {/* Playground */}
            <Route path="/playground" element={<Playground />} />
            
            {/* Spec & Tools */}
            <Route path="/spec" element={<Spec />} />
            <Route path="/test-suite" element={<TestSuite />} />
            
            {/* Visualization Demo */}
            <Route path="/viz" element={<VisualizationDemo />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GrainOverlay />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
