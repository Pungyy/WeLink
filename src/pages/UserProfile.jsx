import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsError, setCommentsError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("utilisateurs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setUser(data);
      }
    };

    fetchUser();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("commentaires")
        .select(`
          id,
          contenu,
          created_at,
          user:utilisateurs!commentaires_user_id_fkey (
            id,
            nom,
            prenom,
            photo_profil
          )
        `)
        .eq("user_target_id", id)
        .order("created_at", { ascending: false });

      if (error) {
        setCommentsError(error.message);
      } else {
        setComments(data);
      }
    };

    fetchComments();
  }, [id]);

  if (error) return <p className="text-red-600 p-6">Erreur : {error}</p>;

  if (!user)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#7b8c76] p-8 relative rounded-b-[50px] flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
          {/* Photo + infos */}
          <div className="flex items-center gap-6 flex-1 w-full md:w-auto">
            <img
              src={user.photo_profil || "/default-avatar.png"}
              alt="profil"
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

          {/* Mon Solde bouton */}
          <div className="ml-auto flex-shrink-0">
            <button
              className="bg-white text-black rounded-2xl px-6 py-3 font-semibold shadow-md flex items-center gap-2 hover:bg-gray-100 transition"
              title="Voir mon solde"
            >
              <span className="text-2xl">💰</span>
              <span>Mon Solde</span>
            </button>
          </div>

          {/* Bouton réglages en haut droit */}
          <button
            className="absolute top-4 right-4 text-white text-3xl hover:opacity-90 transition"
            aria-label="Paramètres"
            title="Paramètres"
          >
            ⚙️
          </button>
        </div>

        {/* Contenu */}
        <div className="px-8 py-10 space-y-10">
          {/* À Propos */}
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>💬</span> À Propos
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
              {user.description || "Aucune description disponible."}
            </p>
          </section>

          {/* Intérêts & Notes */}
          <section className="flex flex-wrap gap-8">
            {user.interets && (
              <div className="flex-1 min-w-[200px] bg-green-100 rounded-xl p-6 shadow-inner">
                <h3 className="font-semibold text-lg mb-2">Intérêts</h3>
                <p className="text-gray-800 whitespace-pre-line">{user.interets}</p>
              </div>
            )}

            {user.notes_moyenne !== null && (
              <div className="flex-1 min-w-[200px] bg-green-100 rounded-xl p-6 shadow-inner flex flex-col items-center justify-center">
                <h3 className="font-semibold text-lg mb-2">Note moyenne</h3>
                <div className="text-5xl font-extrabold text-green-700">
                  {user.notes_moyenne.toFixed(1)}
                </div>
              </div>
            )}
          </section>

          {/* Commentaires */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Commentaires</h2>
              <button
                className="text-3xl font-bold text-green-700 hover:text-green-800 transition"
                aria-label="Ajouter un commentaire"
                title="Ajouter un commentaire"
              >
                +
              </button>
            </div>

            {commentsError && (
              <p className="text-red-600 mb-4">Erreur chargement commentaires : {commentsError}</p>
            )}

            {!comments.length && !commentsError && (
              <p className="text-gray-500 italic">Aucun commentaire disponible.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {comments.map(({ id, contenu, created_at, user }) => (
                <article
                  key={id}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={user?.photo_profil || "/default-avatar.png"}
                      alt={`${user?.prenom} ${user?.nom}`}
                      className="w-12 h-12 rounded-full object-cover border border-gray-300"
                    />
                    <div>
                      <p className="font-semibold text-lg">
                        {user?.prenom} {user?.nom}
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
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
