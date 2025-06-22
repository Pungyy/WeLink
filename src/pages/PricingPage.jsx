import React from 'react';
import PricingCard from '../components/PricingCard';
import logo from '../assets/img/logo.png';

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold mb-4">Nos forfaits</h1>
        <img src={logo} alt="Forfait" className="w-28 mx-auto mb-4" />
      

      <div className="flex flex-col md:flex-row gap-6">
        <PricingCard price="4,99" duration="mois" />
        <PricingCard price="49,99" duration="an" />
      </div>
    </div>
  );
};

export default PricingPage;
