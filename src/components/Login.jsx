import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import logo from '../assets/img/logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage('Email ou mot de passe incorrect.');
      return;
    }

    navigate('/home'); // Redirige vers ta page d'accueil
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#EDEDE9] relative">
      {/* Contenu centré */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md md:max-w-lg bg-transparent">
          {/* Logo */}
          <div className="text-center mb-10">
            <img
              src={logo}
              alt="Welink Logo"
              className="mx-auto max-w-[200px] md:max-w-[220px] w-full h-auto"
            />
          </div>

          {/* Titre */}
          <h2 className="text-2xl md:text-3xl text-center mb-6">Connexion</h2>

          {/* Formulaire */}
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-5 justify-center items-center"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="px-5 py-3 rounded-full border border-gray-300 bg-[#B0B0B023] text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 w-full"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="px-5 py-3 mb-6 rounded-full border border-gray-300 bg-[#B0B0B023] text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 w-full"
            />
            <button
              type="submit"
              className="bg-[#7b8c76] text-black py-3 rounded-full hover:bg-[#66735f] transition p-5 w-full"
            >
              Se connecter
            </button>
          </form>

          {/* Message d'erreur */}
          {message && (
            <p className="text-red-500 text-sm text-center mt-4">{message}</p>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-black" />
            <span className="text-sm text-black">Ou</span>
            <div className="flex-1 h-px bg-black" />
          </div>

          {/* Lien inscription */}
          <p className="text-center text-sm text-black">
            Créer un compte ?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline">
              S’inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
