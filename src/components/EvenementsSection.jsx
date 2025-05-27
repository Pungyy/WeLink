// components/EvenementsSection.jsx

const evenements = [
  {
    titre: "Atelier Peinture",
    date: "28 Mai 2025",
    image: "/atelier-peinture.jpg",
  },
  {
    titre: "Cours de Yoga",
    date: "30 Mai 2025",
    image: "/yoga.jpg",
  },
  {
    titre: "Café Littéraire",
    date: "2 Juin 2025",
    image: "/cafe-litteraire.jpg",
  },
];

const EvenementsSection = () => {
  return (
    <section className="bg-[#f8f8fa] px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">Événements à venir</h2>
      <div className="flex flex-col gap-6 md:flex-row md:gap-4 overflow-x-auto">
        {evenements.map((event, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm overflow-hidden min-w-[260px]"
          >
            <img
              src={event.image}
              alt={event.titre}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{event.titre}</h3>
              <p className="text-sm text-gray-500">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EvenementsSection;
