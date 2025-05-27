const PartenairesSection = () => {
  const partners = ["/logos/carrefour.png", "/logos/tcl.png", "/logos/pathe.png", "/logos/fnac.png"];

  return (
    <section className="p-6">
      <h2 className="text-xl font-semibold mb-4">Partenaires</h2>
      <div className="flex flex-wrap justify-around gap-4">
        {partners.map((logo, index) => (
          <img key={index} src={logo} alt="Partenaire" className="h-10" />
        ))}
      </div>
    </section>
  );
};

export default PartenairesSection;
