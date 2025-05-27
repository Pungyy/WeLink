// components/NouveautesSection.jsx

const cartes = [
  {
    titre: "Course",
    image: "/course.jpg",
    auteur: "Colette",
  },
  {
    titre: "Sport",
    image: "/sport.jpg",
    auteur: "Colette",
  },
  {
    titre: "Jeux",
    image: "/jeux.jpg",
    auteur: "Colette",
  },
];

const NouveautesSection = () => {
  return (
    <section className="px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">Nouveauté</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cartes.map((item, index) => (
          <div
            key={index}
            className="rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.titre}
                className="w-full h-40 object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                {item.titre}
              </div>
            </div>
            <div className="flex items-center gap-2 p-4">
              <img
                src="/colette.jpg"
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="text-sm font-medium">{item.auteur}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NouveautesSection;
