// src/components/Signup.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const [gender, setGender] = useState('');

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f5f5f0] overflow-hidden">
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-transparent">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-6xl font-bold text-[#a78bfa]">
              <span className="text-[#6b7280]">WeLinK</span>
            </h1>
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
          <form className="flex flex-col gap-5">
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

            <button
              type="submit"
              className="bg-[#7b8c76] text-white py-3 rounded-full font-semibold hover:bg-[#66735f] transition"
            >
              Suivant
            </button>
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
