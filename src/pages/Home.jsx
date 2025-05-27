import HeroSection from "../components/HeroSection";
import NouveautesSection from "../components/NouveautesSection";
import UtilisateursSection from "../components/UtilisateursSection";
import EvenementsSection from "../components/EvenementsSection";
import PartenairesSection from "../components/PartenairesSection";

const Home = () => {
  return (
    <div className="font-sans">
      <HeroSection />
      <NouveautesSection />
      <UtilisateursSection />
      <EvenementsSection />
      <PartenairesSection />
    </div>
  );
};

export default Home;
