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
  const [birthdateError, setBirthdateError] = useState('');

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

    if (birthdateError) {
      setMessage("Date de naissance invalide.");
      return;
    }

    // Vérifie si l’email existe déjà dans la table utilisateurs
    const { data: existingUsers, error: emailCheckError } = await supabase
      .from('utilisateurs')
      .select('email')
      .eq('email', email);

    if (emailCheckError) {
      setMessage("Erreur lors de la vérification de l'email.");
      return;
    }

    if (existingUsers.length > 0) {
      setMessage("Cet email est déjà utilisé.");
      return;
    }

    // Parse nom et prénom
    const [prenom = '', nom = ''] = nomPrenom.trim().split(' ').reverse();
    const dobISO = formatDateISO(birthdate);

    // Création de l'utilisateur Supabase Auth
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
        },
      },
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    const user = data.user;

    let avatarUrl = null;
    if (avatar) {
      const fileExt = avatar.name.split('.').pop();
      const uniqueName = crypto.randomUUID(); // ou Date.now()
      // **Ici, on met le fichier à la racine du bucket 'avatars', pas dans un sous-dossier avatars/**
      const filePath = `${uniqueName}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatar, { upsert: true });

      if (uploadError) {
        setMessage("Inscription réussie, mais erreur lors de l'upload de l'image : " + uploadError.message);
        return;
      }

      const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
      avatarUrl = publicUrlData?.publicUrl;
    }

    // Stocker les données dans la table `utilisateurs`
    const { error: insertError } = await supabase
      .from('utilisateurs')
      .insert({
        email,
        genre: gender,
        nom,
        prenom,
        dob: dobISO,
        localisation,
        photo_profil: avatarUrl,
      });

    if (insertError) {
      setMessage("Erreur lors de l'enregistrement des données utilisateur : " + insertError.message);
      return;
    }

    setMessage("Inscription réussie ! Vérifie ton email pour confirmer.");
  };



  
  const handleBirthdateChange = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 8) input = input.slice(0, 8);
    
    let formatted = "";
    if (input.length > 4) {
      formatted = `${input.slice(0, 2)}/${input.slice(2, 4)}/${input.slice(4)}`;
    } else if (input.length > 2) {
      formatted = `${input.slice(0, 2)}/${input.slice(2)}`;
    } else {
      formatted = input;
    }
    
    setBirthdate(formatted);
    
    // Validation de la date quand elle est complète
    if (formatted.length === 10) {
      if (!isValidDate(formatted)) {
        setBirthdateError("Date invalide ou âge non autorisé (18 à 100 ans).");
      }
      else {
        setBirthdateError("");
      }
    } else {
      setBirthdateError(""); // Réinitialiser pendant la saisie
    }
  };
  
  
  const isValidDate = (str) => {
    const [day, month, year] = str.split('/').map(Number);
    if (!day || !month || !year) return false;
    
    const date = new Date(year, month - 1, day);
    const today = new Date();
    const age = today.getFullYear() - year;
    
    const tooYoung = age < 18 || (age === 18 && today < new Date(year + 18, month - 1, day));
    const tooOld = age > 100;
    
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day &&
      !tooYoung &&
      !tooOld
    );
  };
  
  const inputClass = "px-5 py-3 rounded-full border border-gray-300 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300";
  
  
  return (
    <div className="
    min-h-screen flex flex-col justify-between 
    bg-[url('./assets/img/polygon.png')] 
    md:bg-[url('./assets/img/desktop.png')] 
    bg-no-repeat bg-bottom bg-contain relative
    ">
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
                      <input type="radio" name="gender" value="Mme" checked={gender === 'Mme'} onChange={() => setGender('Mme')} className="accent-[#CEB6D9]" />
                      <span>Madame</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="gender" value="M" checked={gender === 'M'} onChange={() => setGender('M')} className="accent-[#CEB6D9]" />
                      <span>Monsieur</span>
                    </label>
                  </div>
                  <input type="text" placeholder="Nom et Prénom" value={nomPrenom} onChange={(e) => setNomPrenom(e.target.value)} className={inputClass} required />
                  <input
                    type="text"
                    placeholder="JJ/MM/AAAA"
                    value={birthdate}
                    onChange={handleBirthdateChange}
                    className={inputClass}
                    required
                  />
                  {birthdateError && (
                    <p className="text-sm text-red-500 -mt-3">{birthdateError}</p>
                  )}
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
                    className="flex flex-col gap-5 absolute w-full items-center"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="avatar-upload"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setAvatar(e.target.files[0]);
                        }
                      }}
                    />
                    <label
                      htmlFor="avatar-upload"
                      className="w-60 h-60 border-2 border-dashed border-gray-400 rounded-md flex items-center justify-center cursor-pointer hover:border-purple-500 transition-colors relative overflow-hidden"
                      title="Cliquez pour uploader votre photo"
                    >
                      {avatar ? (
                        <img
                          src={URL.createObjectURL(avatar)}
                          alt="Aperçu avatar"
                          className="w-full h-full object-cover rounded-md"
                          onLoad={e => URL.revokeObjectURL(e.target.src)} // libérer mémoire
                        />
                      ) : (
                        <span className="text-gray-500 text-center px-2">
                          Cliquez ici pour uploader votre photo
                        </span>
                      )}
                    </label>
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
                        className="bg-[#7b8c76] text-black py-2 px-4 rounded-full hover:bg-[#66735f] cursor-pointer"
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
                        className="bg-[#7b8c76] text-black py-2 px-4 rounded-full hover:bg-[#66735f] cursor-pointer"
                      >
                        Suivant
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="bg-[#7b8c76] text-black py-2 px-4 rounded-full hover:bg-[#66735f] cursor-pointer"
                      >
                        S'inscrire
                      </button>
                    )}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>


          </form>
            {message && <p className="text-center text-sm text-red-500 mt-3">{message}</p>}


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