import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ProfilPage() {
  const [user, setUser] = useState(null);
  const [evenements, setEvenements] = useState([]);
  const [nouveautes, setNouveautes] = useState([]);
  const [commentaires, setCommentaires] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfilData = async () => {
      setLoading(true);
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError || !authData?.user) {
        setLoading(false);
        return;
      }

      const userId = authData.user.id;

      // Infos utilisateur
      const { data: userData } = await supabase
        .from("utilisateurs")
        .select("*")
        .eq("id", userId)
        .single();

      // Récupérer événements inscrits
      const { data: evenementsIdsData } = await supabase
        .from("evenements_participants")
        .select("evenement_id")
        .eq("user_id", userId);
      const evenementsIds = evenementsIdsData?.map((e) => e.evenement_id) || [];

      const { data: evenementsData } = await supabase
        .from("evenements")
        .select("*")
        .in("id", evenementsIds);

      // Récupérer nouveautés inscrites
      const { data: nouveautesIdsData } = await supabase
        .from("nouveautes_participants")
        .select("nouveaute_id")
        .eq("user_id", userId);
      const nouveautesIds = nouveautesIdsData?.map((n) => n.nouveaute_id) || [];

      const { data: nouveautesData } = await supabase
        .from("nouveautes")
        .select("*")
        .in("id", nouveautesIds);

      // Récupérer commentaires reçus avec alias 'auteur' sur user_id (l'auteur du commentaire)
      const { data: commentairesData, error: commentairesError } = await supabase
        .from("commentaires")
        .select(`
          id,
          contenu,
          created_at,
          auteur:user_id (
            prenom,
            photo_profil
          )
        `)
        .eq("user_target_id", userId)
        .order("created_at", { ascending: false });

      setUser(userData);
      setEvenements(evenementsData || []);
      setNouveautes(nouveautesData || []);
      setCommentaires(commentairesData || []);
      setLoading(false);
    };

    fetchProfilData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!user)
    return <p className="text-center p-6 text-red-500">Utilisateur non connecté.</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Header profil */}
        <div className="bg-[#7b8c76] p-8 relative rounded-b-[50px] flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
          <div className="flex items-center gap-6 flex-1 w-full md:w-auto">
            <img
              src={user.photo_profil || "/default-avatar.png"}
              alt={`${user.prenom} ${user.nom}`}
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="text-white">
              <h1 className="text-3xl font-extrabold tracking-wide leading-tight">
                {user.prenom?.toUpperCase()} {user.nom?.toUpperCase()}
              </h1>
              <p className="mt-1 text-lg font-medium">
                {user.genre === "Mme" ? "Étudiante" : "Étudiant"}
              </p>
              <p className="mt-2 max-w-xs text-sm opacity-80">
                {user.localisation || "Localisation inconnue"}
              </p>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="px-8 py-10 space-y-10">
          {/* Description */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>💬</span> À Propos
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
              {user.description || "Aucune description disponible."}
            </p>
          </section>

          {/* Événements inscrits */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[#7b8c76]">
              📅 Événements inscrits
            </h2>
            {evenements.length === 0 ? (
              <p className="text-gray-500 italic">Aucun événement inscrit.</p>
            ) : (
              <ul className="space-y-3">
                {evenements.map((ev) => (
                  <li
                    key={ev.id}
                    className="p-3 border rounded hover:shadow-lg transition cursor-pointer"
                  >
                    <strong>{ev.titre}</strong> -{" "}
                    {new Date(ev.date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Nouveautés inscrites */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[#7b8c76]">
              🆕 Nouveautés inscrites
            </h2>
            {nouveautes.length === 0 ? (
              <p className="text-gray-500 italic">Aucune nouveauté inscrite.</p>
            ) : (
              <ul className="space-y-3">
                {nouveautes.map((nv) => (
                  <li
                    key={nv.id}
                    className="p-3 border rounded hover:shadow-lg transition cursor-pointer"
                  >
                    <strong>{nv.titre}</strong>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Porte-feuille */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-[#7b8c76]">
              💼 Porte-feuille
            </h2>
            <p className="text-gray-500">
              Section porte-feuille à compléter selon ta logique métier.
            </p>
          </section>

          {/* Commentaires reçus */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              💬 Commentaires reçus
            </h2>

            {commentaires.length === 0 ? (
              <p className="text-gray-500 italic">Aucun commentaire disponible.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {commentaires.map(({ id, contenu, created_at, auteur }) => (
                  <article
                    key={id}
                    className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={auteur?.photo_profil || "/default-avatar.png"}
                        alt={auteur?.prenom || "Utilisateur"}
                        className="w-12 h-12 rounded-full object-cover border border-gray-300"
                      />
                      <div>
                        <p className="font-semibold text-lg">
                          {auteur?.prenom || "Anonyme"}
                        </p>
                        <time className="text-sm text-gray-400">
                          {new Date(created_at).toLocaleDateString()}
                        </time>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{contenu}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
