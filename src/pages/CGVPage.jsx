import React from "react";
import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";

export default function CGVPage() {
  return (
    
    <div className="flex flex-col min-h-screen ">
      <MainNavbar />

        <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="bg-[#7b8c76] text-white p-8 rounded-b-[50px]">
                <h1 className="text-4xl font-bold text-center">Conditions Générales de Vente</h1>
            </div>

            <div className="px-8 py-10 space-y-10 text-gray-800 text-justify text-lg leading-relaxed">
            <section>
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p>
                Les présentes Conditions Générales de Vente (ci-après « CGV ») régissent l’ensemble des transactions effectuées sur le site WeLink (ci-après « le Site »), édité par la société WeLink, une startup au capital de 0 €, dont le siège social est situé au 79 rue du Dauphiné, 69003 Lyon. WeLink propose un service de mise en relation entre jeunes et personnes âgées, accessible uniquement aux particuliers et disponible en France métropolitaine. L’utilisation du Site implique l’acceptation sans réserve des présentes CGV.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">2. Mentions légales</h2>
                <p>
                Conformément aux articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'Économie Numérique (LCEN), il est précisé aux utilisateurs du site WeLink l'identité des différents intervenants :
                </p>
                <ul className="list-disc ml-6 space-y-2">
                <li><strong>Éditeur :</strong> WeLink, startup fictive au capital de 0 €, 79 rue du Dauphiné, 69003 Lyon</li>
                <li><strong>Responsable :</strong> Jean Dupont</li>
                <li><strong>Contact :</strong> welink@contact.com</li>
                <li><strong>Hébergement :</strong> OVH SAS, 2 rue Kellermann, 59100 Roubaix – www.ovh.com – 1007</li>
                <li><strong>Données personnelles :</strong> Traitement pour la gestion de comptes, notifications, basé sur contrat et consentement. Conservation : jusqu'à 3 ans après inactivité. Droits : accès, suppression, opposition, via welink@contact.com. CNIL : www.cnil.fr. Aucun transfert hors UE.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">3. Description des services</h2>
                <p>
                WeLink propose un service de mise en relation entre jeunes et personnes âgées via une plateforme en ligne. L’accès au site est gratuit, mais les utilisateurs peuvent souscrire à un abonnement mensuel pour des fonctionnalités supplémentaires.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">4. Modalités d'inscription et d'abonnement</h2>
                <h3 className="font-semibold">4.1 Inscription</h3>
                <p>L’inscription est gratuite, réservée aux particuliers en France. Les informations doivent être exactes. WeLink peut suspendre un compte en cas de non-respect.</p>
                <h3 className="font-semibold mt-4">4.2 Abonnement</h3>
                <p>Abonnement mensuel par carte bancaire, reconduit automatiquement sauf résiliation.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">5. Conditions d'annulation et de résiliation</h2>
                <h3 className="font-semibold">5.1 Droit de rétractation</h3>
                <p>14 jours pour se rétracter, sauf si le service a déjà été exécuté.</p>
                <h3 className="font-semibold mt-4">5.2 Résiliation</h3>
                <p>Possible à tout moment. Prend effet à la fin du mois en cours. Aucun remboursement au prorata.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">6. Modalités de paiement</h2>
                <p>Paiement par carte via une plateforme sécurisée. En cas d’échec, suspension jusqu’à régularisation.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">7. Conditions d’utilisation du service</h2>
                <h3 className="font-semibold">7.1 Accès</h3>
                <p>Réservé aux majeurs résidant en France.</p>
                <h3 className="font-semibold mt-4">7.2 Code de conduite</h3>
                <ul className="list-disc ml-6 space-y-2">
                <li>Respect des membres</li>
                <li>Usage uniquement pour mise en relation</li>
                <li>Aucune activité illégale ou frauduleuse</li>
                <li>Pas de harcèlement ni atteinte à autrui</li>
                </ul>
                <p>Tout manquement peut entraîner la suspension ou la suppression du compte.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">8. Gestion des litiges</h2>
                <p>Recherche d’un accord amiable en priorité. À défaut, tribunal compétent : Lyon.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">9. Responsabilité</h2>
                <p>WeLink est un intermédiaire et décline toute responsabilité sur les interactions entre utilisateurs.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">10. Force majeure</h2>
                <p>WeLink n’est pas responsable en cas d'événement majeur indépendant de sa volonté (catastrophes, pannes, décisions administratives...).</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">11. Modification des CGV</h2>
                <p>Les CGV peuvent être modifiées avec un préavis de 15 jours. L’utilisation du site vaut acceptation.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">12. Acceptation des CGV</h2>
                <p>L’inscription et l’utilisation du service WeLink impliquent l’acceptation complète des présentes CGV.</p>
            </section>
            </div>
            </div>
        </main>
        <Footer />
    </div>
  );
}
