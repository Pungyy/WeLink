import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function ConfirmationPage() {
  const [message, setMessage] = useState('Vérification en cours...');
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    const access_token = params.get('access_token');
    const refresh_token = params.get('refresh_token');
    const expires_in = params.get('expires_in');

    if (!access_token) {
      setMessage('Aucun token trouvé dans l’URL.');
      return;
    }

    const session = {
      access_token,
      refresh_token,
      expires_in: expires_in ? parseInt(expires_in) : null,
      token_type: 'bearer',
    };

    supabase.auth.setSession(session).then(({ error }) => {
      if (error) {
        setMessage('Erreur lors de la connexion : ' + error.message);
      } else {
        setMessage('Confirmation réussie ! Vous êtes connecté.');
        setTimeout(() => {
          navigate('/home'); // ou /dashboard selon ton app
        }, 1500);
      }
    });
  }, [navigate]);

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h2 className="text-xl font-semibold mb-4">Confirmation</h2>
      <p>{message}</p>
    </div>
  );
}
