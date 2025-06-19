import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- ici
import { supabase } from "../lib/supabaseClient";

const NouveautesSection = () => {
  const [nouveautes, setNouveautes] = useState([]);
  const navigate = useNavigate(); // <-- ici

  useEffect(() => {
    const fetchNouveautes = async () => {
      const { data, error } = await supabase
        .from("nouveautes")
        .select(`
          *,
          utilisateurs:createur_id (
            id,
            prenom,
            photo_profil
          )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erreur chargement nouveautés :", error);
      } else {
        setNouveautes(data);
      }
    };

    fetchNouveautes();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/nouveautes/${id}`);
  };

  return (
    <section className="bg-[#fff] px-6 py-10">
      <div className="container mx-auto">
        <h2 className="text-4xl font-semibold mb-6 text-center">Nouveautés</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {nouveautes.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.id)} // <-- redirection ici
              className="rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 w-[260px] sm:w-[300px] cursor-pointer"
            >
              <div className="relative">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.titre}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="absolute bottom-2 left-2 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {item.titre}
                </div>
              </div>
              <div className="flex items-center gap-2 p-4">
                <img
                  src={item.utilisateurs?.photo_profil || '/default-avatar.png'}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="text-sm font-medium">
                  {item.utilisateurs?.prenom || 'Auteur inconnu'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NouveautesSection;
