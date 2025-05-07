// src/components/Login.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png';

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f5f5f0] relative overflow-hidden">
      {/* Contenu centré */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-transparent">
          {/* Logo */}
          <div className="text-center mb-10">
            <img src={logo} alt="iWelin K Logo" className="mx-auto w-32 h-32" />
          </div>

          {/* Titre */}
          <h2 className="text-3xl font-bold text-center mb-6">Connexion</h2>

          {/* Formulaire */}
          <form className="flex flex-col gap-5">
            <input
              type="email"
              placeholder="Email"
              className="px-5 py-3 rounded-full border border-gray-300 bg-white text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <input
              type="password"
              placeholder="Mot de Passe"
              className="px-5 py-3 rounded-full border border-gray-300 bg-white text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
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

      {/* SVG vague en bas */}
      <div className="w-full">
        <svg viewBox="0 0 1440 320" className="w-full h-32">
          <path
            fill="#d8b4fe"
            fillOpacity="1"
            d="M0,256L48,240C96,224,192,192,288,186.7C384,181,480,203,576,197.3C672,192,768,160,864,160C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
