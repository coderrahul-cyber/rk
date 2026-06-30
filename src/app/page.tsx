import AboutSection from "@/section/AbourSection";
import Footer from "@/components/Footer";
import HeroSection from "@/section/Hero";
import InvestmentSection from "@/section/InvestmentSection";
import Navbar from "@/components/Nav";

export default function Home() {
  return (
  <main>
    <Navbar />
 <div className="sticky top-0 h-screen w-full z-0">
        <HeroSection />
      </div>
   <div className="relative z-10 w-full shadow-[0_-20px_50px_rgba(0,0,0,0.3)] rounded-t-[2.5rem] bg-[#E5E1D8] ">
        <AboutSection />
      </div>
      <div className="relative z-10 ">
  <InvestmentSection />
      </div>
      <div className="relative z-10">
        <Footer />

      </div>

  </main>
  );
}
