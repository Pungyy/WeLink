import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useEffect } from 'react';
import logo from '../assets/img/logo.png';
import cartes from '../assets/img/logo.png';


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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10">
      <div className="flex gap-10 items-start w-full max-w-4xl">
        <div className="flex-1 text-center text-2xl font-semibold">
          <img src={logo} alt="Logo" className="h-12 mx-auto mb-6" />
          <p className="text-lg text-gray-700 mb-2">À payer</p>
          <p className="text-3xl font-bold">{price} €</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">Payer en ligne</h2>
          <img src={logo} alt="Cartes" className="mb-6 mx-auto h-8" />
          <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }} className="space-y-4">
            <input placeholder="Nom sur la carte" className="w-full p-2 border rounded" required />
            <input placeholder="Numéro de carte" className="w-full p-2 border rounded" required />
            <div className="flex gap-4">
              <input placeholder="Date d’expiration" className="w-1/2 p-2 border rounded" required />
              <input placeholder="Cryptogramme" className="w-1/2 p-2 border rounded" required />
            </div>
            <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
              Payer €
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
