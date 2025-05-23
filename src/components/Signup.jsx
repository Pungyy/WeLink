import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import logo from '../assets/img/logo.png';
import { motion, AnimatePresence } from 'framer-motion';

export default function Signup() {
  const [step, setStep] = useState(1);

  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nomPrenom, setNomPrenom] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState('');

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const formatDateISO = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    if (!day || !month || !year) return null;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    const [prenom = '', nom = ''] = nomPrenom.trim().split(' ').reverse();
    const dobISO = formatDateISO(birthdate);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          genre: gender,
          nom,
          prenom,
          dob: dobISO,
          email,
          localisation,
        }
      }
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    const user = data.user;
    if (!user) {
      setMessage("Erreur lors de la création de l'utilisateur.");
      return;
    }

    if (avatar) {
      const fileExt = avatar.name.split('.').pop();
      const filePath = `avatars/${user.id}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatar, { upsert: true });

      if (uploadError) {
        setMessage("Inscription réussie, mais erreur d'image : " + uploadError.message);
        return;
      }

      const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
      const avatarUrl = publicUrlData?.publicUrl;

      await supabase.auth.updateUser({ data: { avatar_url: avatarUrl } });
    }

    setMessage("Inscription réussie ! Vérifie ton email pour confirmer.");
  };

  const inputClass = "px-5 py-3 rounded-full border border-gray-300 bg-white placeholder:text-gray-400";

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f5f5f0] overflow-hidden">
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-transparent">
          <div className="text-center mb-10">
            <img src={logo} alt="Welink Logo" className="mx-auto max-w-[200px] md:max-w-[220px] w-full h-auto" />
          </div>

          <h2 className="text-3xl font-bold text-center mb-6">Inscription</h2>

          <form onSubmit={handleSignup} className="relative h-[300px]">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-5 absolute w-full"
                >
                  <div className="flex justify-center gap-6 ">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="gender" value="Mme" checked={gender === 'Mme'} onChange={() => setGender('Mme')} className="accent-[#7b8c76]" />
                      <span>Madame</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="gender" value="M" checked={gender === 'M'} onChange={() => setGender('M')} className="accent-[#7b8c76]" />
                      <span>Monsieur</span>
                    </label>
                  </div>
                  <input type="text" placeholder="Nom et Prénom" value={nomPrenom} onChange={(e) => setNomPrenom(e.target.value)} className={inputClass} required />
                  <input type="text" placeholder="JJ/MM/AAAA" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} className={inputClass} required />
                  <input type="text" placeholder="Adresse" value={localisation} onChange={(e) => setLocalisation(e.target.value)} className={inputClass} required />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-5 absolute w-full"
                >
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} required />
                  <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} required />
                  <input type="password" placeholder="Confirmer le mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputClass} required />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-5 absolute w-full"
                >
                  <input type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} className="text-sm text-gray-700" />
                </motion.div>
              )}
            </AnimatePresence>

              {/* BOUTONS DE NAVIGATION */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`buttons-step-${step}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex justify-between mt-6 absolute bottom-0 w-full"
              >
                <div className="flex justify-between mt-6 absolute bottom-0 w-full">
                  <div>
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="text-sm text-gray-600 hover:underline"
                      >
                        Précédent
                      </button>
                    ) : (
                      // div vide pour réserver la place et garder "Suivant" aligné à droite
                      <div />
                    )}
                  </div>

                  <div>
                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="bg-[#7b8c76] text-white py-2 px-4 rounded-full hover:bg-[#66735f]"
                      >
                        Suivant
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="bg-[#7b8c76] text-white py-2 px-4 rounded-full hover:bg-[#66735f]"
                      >
                        S'inscrire
                      </button>
                    )}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>


            {message && <p className="text-center text-sm text-red-500 mt-3">{message}</p>}
          </form>


          <p className="text-center text-sm text-gray-600 mt-6">
            Vous avez déjà un compte ?{' '}
            <Link to="/" className="text-blue-500 hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}