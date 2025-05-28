// components/HeroSection.jsx
import HeroImage from "../assets/img/hero.jpeg";
const HeroSection = () => {
  return (
    <section className="relative">
      <img
        src={HeroImage}
        alt="groupe de personnes âgées"
        className="w-full h-[400px] object-cover rounded-b-3xl"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-b-3xl">
        <h1 className="text-white text-4xl font-bold text-center px-4">
          Bienvenue sur <span className="text-white">Welink !</span>
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;
