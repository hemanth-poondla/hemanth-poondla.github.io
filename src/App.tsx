import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AnimatedRoutes } from "./components/AnimatedRoutes";
import { AdminProvider } from "./contexts/AdminContext";
import { AdminToggle } from "./components/AdminToggle";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AdminProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatedRoutes />
            <AdminToggle />
          </BrowserRouter>
        </TooltipProvider>
      </AdminProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
