// src/components/Signup.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import logo from '../assets/img/logo.png';

export default function Signup() {
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { gender }
      }
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Compte créé ! Vérifie ton email pour confirmer.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f5f5f0] overflow-hidden">
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-transparent">
          {/* Logo */}
          <div className="text-center mb-10">
            <img src={logo} alt="Welink Logo" className="mx-auto max-w-[200px] md:max-w-[220px] w-full h-auto" />
          </div>

          {/* Titre */}
          <h2 className="text-3xl font-bold text-center mb-6">Inscription</h2>

          {/* Choix civilité */}
          <div className="flex justify-center gap-6 mb-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="gender"
                value="Mme"
                checked={gender === 'Mme'}
                onChange={() => setGender('Mme')}
                className="accent-[#7b8c76]"
              />
              <span>Mme</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="gender"
                value="M"
                checked={gender === 'M'}
                onChange={() => setGender('M')}
                className="accent-[#7b8c76]"
              />
              <span>M</span>
            </label>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSignup} className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Nom et Prénom"
              className="px-5 py-3 rounded-full border border-gray-300 bg-white placeholder:text-gray-400"
            />
            <input
              type="text"
              placeholder="JJ/MM/AAAA"
              className="px-5 py-3 rounded-full border border-gray-300 bg-white placeholder:text-gray-400"
            />
            <input
              type="text"
              placeholder="Adresse"
              className="px-5 py-3 rounded-full border border-gray-300 bg-white placeholder:text-gray-400"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-5 py-3 rounded-full border border-gray-300 bg-white placeholder:text-gray-400"
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-5 py-3 rounded-full border border-gray-300 bg-white placeholder:text-gray-400"
              required
            />

            <button
              type="submit"
              className="bg-[#7b8c76] text-white py-3 rounded-full font-semibold hover:bg-[#66735f] transition"
            >
              S'inscrire
            </button>

            {message && <p className="text-center text-sm text-red-500">{message}</p>}
          </form>

          {/* Lien login */}
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
