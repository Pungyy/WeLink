import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';


export default function EvenementsPage() {
  const [evenements, setEvenements] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchEvenements = async () => {
      const { data, error } = await supabase
        .from('evenements')
        .select('*')
        .order('date', { ascending: true });

      if (!error) {
        setEvenements(data);
      }
    };

    fetchEvenements();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Liste des événements</h1>
      <div className="grid gap-6">
        {evenements.map((e) => (
          <div
            key={e.id}
            onClick={() => navigate(`/evenements/${e.id}`)}
            className="cursor-pointer border border-gray-300 rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition"
          >

            <h2 className="text-xl font-semibold">{e.titre}</h2>
            <p className="text-sm text-gray-500 mb-2">{e.date}</p>
            <p className="mb-3">{e.description}</p>
            {e.image && (
              <img
                src={e.image}
                alt={e.titre}
                className="w-full max-h-64 object-cover rounded-lg"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}