import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo.png';

const PricingCard = ({ price, duration }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/explore/checkout', {
      state: { price, duration }
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-xs">
      <img src={logo} alt="Forfait" className="w-28 mx-auto mb-4" />
      <div className="text-center mb-4">
        <p className="text-2xl font-bold">{price}€</p>
        <p className="text-sm text-gray-500">/{duration}</p>
      </div>
      <ul className="text-sm text-gray-700 mb-4 space-y-2">
        <li>• Interface plus fluide et personnalisable</li>
        <li>• Invitation à des évènements</li>
        <li>• Suppression de publicité</li>
        <li>• Réductions chez les partenaires</li>
      </ul>
      <button
        onClick={handleClick}
        className="bg-purple-200 hover:bg-purple-300 text-black font-medium py-2 px-4 rounded w-full cursor-pointer"
      >
        Acheter
      </button>
    </div>
  );
};

export default PricingCard;
