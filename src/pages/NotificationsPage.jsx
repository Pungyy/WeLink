import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    const { data: sessionData } = await supabase.auth.getUser();
    const userId = sessionData?.user?.id;
    if (!userId) return;

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setNotifications(data);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>

      {error && <p className="text-red-500">{error}</p>}

      {!notifications.length && <p className="text-gray-500">Aucune notification.</p>}

      <ul className="space-y-4">
        {notifications.map((notif) => (
          <li
            key={notif.id}
            className={`p-4 rounded-lg border ${notif.statut === "non_lu" ? "bg-yellow-50" : "bg-white"}`}
          >
            <p className="text-gray-800">{notif.contenu}</p>
            <small className="text-gray-400">{new Date(notif.created_at).toLocaleString()}</small>
            {notif.lien && (
              <button
                onClick={() => navigate(notif.lien)}
                className="block mt-2 text-blue-600 hover:underline"
              >
                Voir
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
