import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const UserProfile = ({ id }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsError, setCommentsError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [friendRequestStatus, setFriendRequestStatus] = useState(null); // null, en_attente, accepte, refuse
  const [sendingRequest, setSendingRequest] = useState(false);

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

    if (id) fetchUser();
  }, [id]);

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

  useEffect(() => {
    if (id) fetchComments();
  }, [id]);

  const checkFriendRequest = async () => {
    const { data: sessionData } = await supabase.auth.getUser();
    const currentUserId = sessionData?.user?.id;
    if (!currentUserId) return;

    const { data, error } = await supabase
      .from("demandes_amis")
      .select("statut")
      .or(
        `sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`
      )
      .eq("receiver_id", id)
      .order("created_at", { ascending: false })
      .limit(1);

    if (data?.length > 0) {
      setFriendRequestStatus(data[0].statut);
    }
  };

  useEffect(() => {
    if (id) checkFriendRequest();
  }, [id]);

  const handleSendFriendRequest = async () => {
    setSendingRequest(true);

    const { data: sessionData } = await supabase.auth.getUser();
    const currentUserId = sessionData?.user?.id;

    if (!currentUserId || currentUserId === id) {
      setSendingRequest(false);
      return;
    }

    const { error } = await supabase.from("demandes_amis").insert([
      {
        sender_id: currentUserId,
        receiver_id: id,
        statut: "en_attente",
      },
    ]);

    if (!error) {
      setFriendRequestStatus("en_attente");

      await supabase.from("notifications").insert([
        {
          user_id: id,
          contenu: `📩 Nouvelle demande d’ami reçue !`,
          type: "demande_ami",
          lien: `/demandes`,
        },
      ]);
    }

    setSendingRequest(false);
  };


  const handleCommentSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const { data: sessionData } = await supabase.auth.getUser();
    const userId = sessionData?.user?.id;

    if (!userId || !newComment.trim()) {
      setSubmitError("Le commentaire ne peut pas être vide.");
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase.from("commentaires").insert([
      {
        contenu: newComment.trim(),
        user_id: userId,
        user_target_id: id,
      },
    ]);

    if (error) {
      setSubmitError("Erreur lors de l'envoi : " + error.message);
    } else {
      setNewComment("");
      setIsModalOpen(false);
      fetchComments();
    }

    setIsSubmitting(false);
  };

  if (error) return <p className="text-red-600 p-6">Erreur : {error}</p>;

  if (!user)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#7b8c76] p-8 relative rounded-b-[50px] flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
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

              {friendRequestStatus === null && (
                <button
                  onClick={handleSendFriendRequest}
                  disabled={sendingRequest}
                  className="mt-3 px-4 py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50 cursor-pointer"
                >
                  {sendingRequest ? "Envoi..." : "Envoyer une demande d’ami"}
                </button>
              )}

              {friendRequestStatus === "en_attente" && (
                <p className="mt-3 text-yellow-200 text-sm">📨 Demande en attente</p>
              )}

              {friendRequestStatus === "accepte" && (
                <p className="mt-3 text-green-200 text-sm">✅ Vous êtes amis</p>
              )}

              {friendRequestStatus === "refuse" && (
                <p className="mt-3 text-red-200 text-sm">❌ Demande refusée</p>
              )}
            </div>
          </div>
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
                onClick={() => setIsModalOpen(true)}
                className="text-3xl font-bold text-green-700 hover:text-green-800 transition cursor-pointer"
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

      {/* Modal pour ajouter un commentaire */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Ajouter un commentaire</h2>
            <textarea
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Votre commentaire..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            {submitError && <p className="text-red-600 mt-2">{submitError}</p>}
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleCommentSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Envoi..." : "Envoyer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
