import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./ScrollToTop";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Projects from "@/pages/Projects";
import Work from "@/pages/Work";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

export function AnimatedRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
