import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function DemandesPage() {
  const [demandes, setDemandes] = useState([]);
  const [error, setError] = useState(null);

  const fetchDemandes = async () => {
    const { data: sessionData } = await supabase.auth.getUser();
    const userId = sessionData?.user?.id;

    const { data, error } = await supabase
      .from("demandes_amis")
      .select(`
        id,
        sender:utilisateurs!demandes_amis_sender_id_fkey (
          id,
          prenom,
          nom,
          photo_profil
        )
      `)
      .eq("receiver_id", userId)
      .eq("statut", "en_attente")
      .order("created_at", { ascending: false });

    if (error) setError(error.message);
    else setDemandes(data);
  };

  const handleAction = async (demandeId, action) => {
    const { data: sessionData } = await supabase.auth.getUser();
    const currentUserId = sessionData?.user?.id;

    // Récupérer la demande pour identifier le sender
    const { data: demande } = await supabase
        .from("demandes_amis")
        .select("sender_id")
        .eq("id", demandeId)
        .single();

    const senderId = demande?.sender_id;

    if (action === "accepte" && senderId) {
        // Ajouter la relation d'amitié (1 sens suffit, ou 2 si tu veux redondant)
        await supabase.from("amis").insert([
        { user_id: currentUserId, ami_id: senderId },
        { user_id: senderId, ami_id: currentUserId }
        ]);

        // Envoyer une notification à l'expéditeur
        await supabase.from("notifications").insert([
        {
            user_id: senderId,
            contenu: `✅ ${sessionData.user.user_metadata.prenom} a accepté votre demande d’ami !`,
            type: "ami_accepte",
            lien: `/user/${currentUserId}`
        }
        ]);
    }

    // Mettre à jour le statut de la demande
    await supabase
        .from("demandes_amis")
        .update({ statut: action })
        .eq("id", demandeId);

    // Recharger les demandes
    fetchDemandes();
    };


  useEffect(() => {
    fetchDemandes();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Demandes d’amis reçues</h1>

      {error && <p className="text-red-500">{error}</p>}

      {!demandes.length && <p className="text-gray-500">Aucune demande en attente.</p>}

      <ul className="space-y-4">
        {demandes.map(({ id, sender }) => (
          <li key={id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-4">
              <img
                src={sender?.photo_profil || "/default-avatar.png"}
                alt=""
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="font-semibold">
                {sender?.prenom} {sender?.nom}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAction(id, "accepte")}
                className="px-4 py-1 bg-green-500 text-white rounded"
              >
                Accepter
              </button>
              <button
                onClick={() => handleAction(id, "refuse")}
                className="px-4 py-1 bg-red-500 text-white rounded"
              >
                Refuser
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
