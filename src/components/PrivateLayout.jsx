import React from 'react';
import MobileNavbar from './MobileNavbar';

export default function PrivateLayout({ children }) {
  return (
    <div className="pb-20"> {/* Ajoute un padding en bas pour la navbar */}
      {children}
      <MobileNavbar />
    </div>
  );
}
