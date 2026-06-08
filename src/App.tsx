import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Scenery from "@/pages/Scenery";
import Cuisine from "@/pages/Cuisine";
import Culture from "@/pages/Culture";
import Specialties from "@/pages/Specialties";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-jiangxi-cream">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scenery" element={<Scenery />} />
            <Route path="/cuisine" element={<Cuisine />} />
            <Route path="/culture" element={<Culture />} />
            <Route path="/specialties" element={<Specialties />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
