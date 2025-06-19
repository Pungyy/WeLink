import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient"; // ajuste selon ton chemin réel

const EvenementsSection = () => {
  const [evenements, setEvenements] = useState([]);

  useEffect(() => {
    const fetchEvenements = async () => {
      const { data, error } = await supabase
        .from("evenements")
        .select(`
          *,
          utilisateurs:createur_id ( id, prenom, photo_profil )
        `)
        .order("date", { ascending: true });

      if (error) {
        console.error("Erreur lors du chargement des événements :", error);
      } else {
        setEvenements(data);
      }
    };

    fetchEvenements();
  }, []);

  return (
    <section className="bg-[#fff] px-6 py-10">
      <div className="container mx-auto">
        <h2 className="text-4xl font-semibold mb-6 text-center">
          Événements à venir
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {evenements.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden w-[260px] sm:w-[300px]"
            >
              {event.image && (
                <img
                  src={event.image}
                  alt={event.titre}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{event.titre}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                {/* Créateur de l'événement */}
                <div className="flex items-center mt-3 gap-3">
                  <img
                    src={event.utilisateurs?.photo_profil || '/default-avatar.png'}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-700 font-medium">
                    {event.utilisateurs?.prenom || 'Inconnu'}
                  </span>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default EvenementsSection;
