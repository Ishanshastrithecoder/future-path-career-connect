
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./pages/Chatbot";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            
            <Route path="/chatbot" element={<Chatbot />} />

            {/* Placeholder routes for future implementation */}
            <Route path="/career-explorer" element={<ComingSoon title="Career Explorer" />} />
            <Route path="/resume-builder" element={<ComingSoon title="Resume Builder" />} />
            <Route path="/skill-assessment" element={<ComingSoon title="Skill Assessment" />} />
            <Route path="/interviews" element={<ComingSoon title="Interview Preparation" />} />
            <Route path="/mentors" element={<ComingSoon title="Find Mentors" />} />
            <Route path="/network" element={<ComingSoon title="Career Network" />} />
            <Route path="/profile" element={<ComingSoon title="User Profile" />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

// Temporary component for features that are not yet implemented
const ComingSoon = ({ title }: { title: string }) => (
  <div className="min-h-screen flex flex-col">
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-careerblue-800">{title}</h1>
        <p className="text-lg text-gray-600 mb-6">
          We're currently building this feature. Check back soon for updates!
        </p>
        <button
          onClick={() => window.history.back()}
          className="bg-careerblue-600 text-white px-6 py-2 rounded-md hover:bg-careerblue-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  </div>
);

export default App;
