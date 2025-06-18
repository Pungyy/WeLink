// src/components/DesktopNavbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import userIcon from "../assets/img/vector.png";

const DesktopNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="hidden md:flex justify-between items-center px-10 py-4 shadow-sm border-b">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo Welink" className="h-8" />
      </div>

      {/* Bouton Créer une annonce */}
      <button
        onClick={() => navigate("/create")}
        className="bg-purple-200 text-purple-800 font-medium px-4 py-2 rounded-lg text-sm hover:bg-purple-300 transition"
      >
        📋 Créer une annonce
      </button>

      {/* Liens de navigation */}
      <div className="flex items-center gap-8">
        <button
          onClick={() => navigate("/home")}
          className="text-sm font-bold text-black hover:underline"
        >
          Accueil
        </button>
        <button
          onClick={() => navigate("/offres")}
          className="text-sm font-bold text-black hover:underline"
        >
          Offres
        </button>
        <button
          onClick={() => navigate("/messages")}
          className="text-sm font-bold text-black hover:underline"
        >
          Messages
        </button>

        {/* Icône utilisateur */}
        <button onClick={() => navigate("/profile")}>
          <img src={userIcon} alt="Profil" className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default DesktopNavbar;
