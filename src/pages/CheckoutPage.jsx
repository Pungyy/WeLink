import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useEffect } from 'react';
import logo from '../assets/img/logo.png';
import cartes from '../assets/img/logo.png'; // Remplace si besoin

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { price = "0.00", duration = "" } = location.state || {};

  useEffect(() => {
    if (!price) {
      navigate('/explore/offer');
    }
  }, [price, navigate]);

  const handlePayment = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("Connecte-toi pour finaliser le paiement.");
      return;
    }

    await supabase
      .from('utilisateurs')
      .update({ premium: true })
      .eq('id', user.id);

    alert('Paiement réussi. Tu es maintenant Premium !');
    navigate('/home');
  };

  return (
    <div className="px-4 py-16">
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl mx-auto">
        {/* Section gauche */}
        <div className="flex-1 text-center lg:text-left">
          <img src={logo} alt="Logo" className="h-12 mx-auto lg:mx-0 mb-6" />
          <p className="text-lg text-gray-700 mb-2">À payer</p>
          <p className="text-3xl font-bold">{price} €</p>
        </div>

        {/* Section droite : formulaire */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 w-full max-w-md mx-auto lg:mx-0">
          <h2 className="text-lg font-bold mb-4 text-center lg:text-left">Payer en ligne</h2>
          <img src={cartes} alt="Cartes" className="mb-6 mx-auto h-8" />
          <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }} className="space-y-4">
            <input placeholder="Nom sur la carte" className="w-full p-2 border rounded" required />
            <input placeholder="Numéro de carte" className="w-full p-2 border rounded" required />
            <div className="flex flex-col sm:flex-row gap-4">
              <input placeholder="Date d’expiration" className="w-full sm:w-1/2 p-2 border rounded" required />
              <input placeholder="Cryptogramme" className="w-full sm:w-1/2 p-2 border rounded" required />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
              Payer {price} €
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
