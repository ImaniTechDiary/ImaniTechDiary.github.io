import { Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";
import Projects from "@/pages/Projects";
import NotFound from "@/pages/NotFound";

const PageTransition = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PageTransition;
