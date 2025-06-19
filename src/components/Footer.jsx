import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // N'oublie pas ce import !

export default function Footer() {
  return (
    <footer className="bg-purple-300 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-6">

        {/* Partie gauche : newsletter */}
        <div className="md:w-1/2">
          <h1 className="text-lg font-semibold mb-3 text-white">Inscris toi à notre newsletter</h1>
          <form className="flex max-w-md">
            <input
              type="email"
              placeholder="Votre email"
              className="bg-white flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
            <button
              type="submit"
              className="bg-[#0C8336] text-white px-4 py-2 rounded-r-md hover:bg-green-700 transition"
            >
              Inscription
            </button>
          </form>
        </div>

        {/* Partie droite : réseaux sociaux */}
        <div className="md:w-1/2 flex flex-col md:items-end">
          <h1 className="mb-3 text-lg font-semibold">Retrouvez-nous sur :</h1>
          <div className="flex space-x-4 text-black-600">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-green-800">
              <FaFacebookF size={30} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="X" className="hover:text-green-800">
              <FaTwitter size={30} />
            </a>
            <a href="https://instagram.com/welink_fr" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-green-800">
              <FaInstagram size={30} />
            </a>
          </div>
        </div>
      </div>

      {/* Texte en bas centré avec lien CGV */}
      <div className="mt-8 border-t border-gray-300 pt-4 text-center text-black font-medium space-x-4">
        <span>Mention légale</span>
        <span>|</span>
        <span>Cookie</span>
        <span>|</span>
        <span>Assistance</span>
        <span>|</span>
        <Link to="/cgv" className="hover:underline hover:text-green-800">
          CGV
        </Link>
      </div>
    </footer>
  );
}
