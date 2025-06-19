import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import homeIcon from "../assets/img/home.png";
import compassIcon from "../assets/img/explorer.png";
import chatIcon from "../assets/img/message.png";
import userIcon from "../assets/img/vector.png";

const tabs = [
  { name: "home", icon: homeIcon, path: "/home" },
  { name: "explore", icon: compassIcon, path: "/" },
  { name: "chat", icon: chatIcon, path: "/messages" },
  { name: "profile", icon: userIcon, path: "/profile" },
];

export default function MobileNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-4 inset-x-4 z-50 md:hidden">
      <div className="relative bg-white rounded-full shadow-md flex justify-between items-center px-6 py-4">
        {/* Tabs avant le bouton central */}
        {tabs.slice(0, 2).map((tab) => (
          <button
            key={tab.name}
            onClick={() => navigate(tab.path)}
            className="flex flex-col items-center"
          >
            <img
              src={tab.icon}
              alt={tab.name}
              className={`w-6 h-6 ${isActive(tab.path) ? "opacity-100" : "opacity-50"}`}
            />
          </button>
        ))}

        {/* Espace vide pour le bouton central */}
        <div className="w-12" />

        {/* Tabs après le bouton central */}
        {tabs.slice(2).map((tab) => (
          <button
            key={tab.name}
            onClick={() => navigate(tab.path)}
            className="flex flex-col items-center"
          >
            <img
              src={tab.icon}
              alt={tab.name}
              className={`w-6 h-6 ${isActive(tab.path) ? "opacity-100" : "opacity-50"}`}
            />
          </button>
        ))}
      </div>

      {/* Bouton central flottant */}
      <button
        className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-br from-green-200 via-purple-300 to-gray-300 shadow-lg flex items-center justify-center"
        onClick={() => navigate("/create")}
      >
        <span className="text-white text-2xl font-bold">+</span>
      </button>
    </div>
  );
}
