import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png';

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#EDEDE9] relative">

      {/* Contenu centré */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md md:max-w-lg bg-transparent">
          {/* Logo */}
          <div className="text-center mb-10">
            <img src={logo} alt="Welink Logo" className="mx-auto max-w-[200px] md:max-w-[220px] w-full h-auto" />
          </div>

          {/* Titre */}
          <h2 className="text-2xl md:text-3xl text-center mb-6">Connexion</h2>

          {/* Formulaire */}
          <form className="flex flex-col gap-5 justify-center items-center">
            <input
              type="email"
              placeholder="Email"
              className="px-5 py-3 mb-6 rounded-full border border-gray-300 bg-[#B0B0B023] text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 max-w-[50%]"
            />
            <input
              type="password"
              placeholder="Mot de Passe"
              className="px-5 py-3 rounded-full border border-gray-300 bg-[#B0B0B023] text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <button
              type="submit"
              className="bg-[#7b8c76] text-white py-3 rounded-full font-semibold hover:bg-[#66735f] transition"
            >
              Se connecter
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-400" />
            <span className="text-sm text-gray-600">Ou</span>
            <div className="flex-1 h-px bg-gray-400" />
          </div>

          {/* Lien inscription */}
          <p className="text-center text-sm text-gray-600">
            Créer un compte ?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              S’inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
