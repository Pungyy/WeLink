import tcl from '../assets/img/tcl.png';
import carrefour from '../assets/img/carrefour.png';
import fnac from '../assets/img/fnac.png';
import pathe from '../assets/img/pathe.png';



const PartenairesSection = () => {
  const partners = [carrefour, tcl, pathe, fnac];

  return (
    <section className="p-6">
      <h2 className="text-xl font-semibold mb-4">Partenaires</h2>
      <div className="flex justify-around items-center">
        {partners.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt="Partenaire"
            className="max-w-[22%] h-auto object-contain"
          />
        ))}
      </div>

    </section>
  );
};


export default PartenairesSection;
