import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import LoadingSpinner from './LoadingSpinner';

export default function PrivateRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (mounted) {
        setUser(data?.user || null);
        setLoading(false);
      }
    };

    getUser();

    // Optionnel : écoute des changements
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (mounted) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      authListener?.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  // Ici, on NE redirige que si on est sûr que l'utilisateur n'est pas connecté
  if (!user) {
    return <Navigate to="/Login" replace />;
  }

  return children;
}
