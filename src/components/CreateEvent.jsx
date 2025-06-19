import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CreateEvent() {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const inputClass = "px-5 py-3 rounded-full border border-gray-300 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 w-full";

  const handleDateChange = (e) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.length > 8) input = input.slice(0, 8);

    let formatted = '';
    if (input.length > 4) {
      formatted = `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4)}`;
    } else if (input.length > 2) {
      formatted = `${input.slice(0, 2)}/${input.slice(2)}`;
    } else {
      formatted = input;
    }

    setDate(formatted);
  };

  const formatDateISO = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    if (!day || !month || !year) return null;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const { data: authData, error: authError } = await supabase.auth.getUser();
    const currentUser = authData?.user;

    if (!currentUser || authError) {
      setMessage("Impossible de récupérer l'utilisateur connecté.");
      return;
    }

    if (!titre || !description || !date) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }

    const isoDate = formatDateISO(date);
    if (!isoDate) {
      setMessage('Date invalide.');
      return;
    }

    let imageUrl = null;
    if (image) {
      const ext = image.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('evenements').upload(filePath, image);
      if (uploadError) {
        setMessage("Erreur lors de l'upload de l'image.");
        return;
      }
      const { data } = supabase.storage.from('evenements').getPublicUrl(filePath);
      imageUrl = data?.publicUrl;
    }

    const { error: insertError } = await supabase.from('evenements').insert([
      {
        titre,
        description,
        date: isoDate,
        image: imageUrl,
        createur_id: currentUser.id
      }
    ]);


    if (insertError) {
      setMessage("Erreur lors de l'enregistrement : " + insertError.message);
      return;
    }

    setMessage("Événement créé avec succès !");
    setTimeout(() => navigate('/evenements'), 1500);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center bg-white px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Créer un événement</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Titre de l'événement"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            className={inputClass}
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-5 py-3 rounded-2xl border border-gray-300 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none w-full h-32"
            required
          />

          <input
            type="text"
            placeholder="JJ/MM/AAAA"
            value={date}
            onChange={handleDateChange}
            className={inputClass}
            required
          />

          <div className="w-full">
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setImage(e.target.files[0]);
                }
              }}
            />
            <label
              htmlFor="image-upload"
              className="w-full h-60 border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center cursor-pointer hover:border-purple-500 transition-colors relative overflow-hidden"
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-xl"
                  onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                />
              ) : (
                <span className="text-gray-500 text-center px-2">
                  Cliquez pour uploader une image
                </span>
              )}
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-full hover:bg-purple-700 transition-colors"
          >
            Créer l’événement
          </button>

          {message && (
            <p className="text-center text-sm text-red-500 mt-2">{message}</p>
          )}
        </form>
      </div>
    </motion.div>
  );
}
