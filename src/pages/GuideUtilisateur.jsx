import React from 'react';

export default function GuideUtilisateur() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-100 px-6 py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Texte */}
          <div className="text-left md:w-1/2 space-y-3">
            <h1 className="text-5xl font-semibold leading-tight text-black">
              Guide<br />
              d’utilisation de<br />
              Welink
            </h1>
          </div>

          {/* Icône */}
          <div className="mt-10 md:mt-0 md:w-1/3 flex justify-center md:justify-end">
            <div>
              <img src="img/Icone (1).png" alt="Welink Logo" className="h-70 w-70 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-10 px-4 space-y-16 text-center">

        {/* Section Connexion */}
        <section className="flex flex-col md:flex-row items-center gap-6 text-lg">
          <img src="img/connexion.png" alt="Connexion" className="w-full md:w-1/3 rounded shadow" />
          <div className="md:text-left">
            <h2 className="text-2xl font-semibold mb-2">Connexion</h2>
            <p>
              Sur l’écran d’accueil, entrez votre email et mot de passe, puis appuyez sur Connexion.<br />
              Astuce : Cliquez sur Créer un compte si vous êtes nouveau.
            </p>
          </div>
        </section>
        <hr className="w-2/3 mx-auto border-t border-gray-300" />

        {/* Section Profil Utilisateur 1 */}
        <section className="flex flex-col md:flex-row-reverse items-center gap-6 text-lg">
          <img src="img/profil.png" alt="Profil utilisateur" className="w-full md:w-1/3 rounded shadow" />
          <div className="md:text-left">
            <h2 className="text-2xl font-semibold mb-2">Profil Utilisateur</h2>
            <p>
              Consultez votre fiche personnelle. Ajoutez une photo, votre bio, vos compétences et vos disponibilités.<br />
              Vous pouvez également modifier vos informations à tout moment.
            </p>
          </div>
        </section>
        <hr className="w-2/3 mx-auto border-t border-gray-300" />

        {/* Section Récompenses */}
        <section className="flex flex-col md:flex-row items-center gap-6 text-lg">
          <img src="img/solde.png" alt="Récompenses" className="w-full md:w-1/3 rounded shadow" />
          <div className="md:text-left">
            <h2 className="text-2xl font-semibold mb-2">Récompenses</h2>
            <p>
              Accumulez des points de fidélité en utilisant l'application. Échangez les contre des récompenses exclusives.
            </p>
          </div>
        </section>
        <hr className="w-2/3 mx-auto border-t border-gray-300" />

        {/* Section Détails Produit */}
        <section className="flex flex-col md:flex-row-reverse items-center gap-6 text-lg">
          <img src="img/produit.png" alt="Détails Produit" className="w-full md:w-1/3 rounded shadow" />
          <div className="md:text-left">
            <h2 className="text-2xl font-semibold mb-2">Détails Produit</h2>
            <p>
              Consultez la fiche détaillée d’un produit, incluant la description, les avis clients, et la localisation en carte interactive.
            </p>
          </div>
        </section>
        <hr className="w-2/3 mx-auto border-t border-gray-300" />

        {/* Section Profil Utilisateur 2 */}
        <section className="flex flex-col md:flex-row items-center gap-6 text-lg">
          <img src="img/paiement.png" alt="Profil utilisateur 2" className="w-full md:w-1/3 rounded shadow" />
          <div className="md:text-left">
            <h2 className="text-2xl font-semibold mb-2">Profil Utilisateur</h2>
            <p>
              Consultez votre fiche personnelle. Ajoutez une photo, votre bio, vos compétences et vos disponibilités.<br />
              Vous pouvez également modifier vos informations à tout moment.
            </p>
          </div>
        </section>
        <hr className="w-2/3 mx-auto border-t border-gray-300" />

        {/* Section Messagerie Instantanée */}
        <section className="flex flex-col md:flex-row-reverse items-center gap-6 text-lg">
          <img src="img/message.png" alt="Messagerie" className="w-full md:w-1/3 rounded shadow" />
          <div className="md:text-left">
            <h2 className="text-2xl font-semibold mb-2">Messagerie Instantanée</h2>
            <p>
              Discutez en direct avec les vendeurs et d'autres utilisateurs via la messagerie instantanée.<br />
              Les messages sont sécurisés et organisés par conversation.
            </p>
          </div>
        </section>

      </main>
    </>
  );
}
