import React from 'react';
import MainNavbar from './MainNavbar';
import Footer from './Footer';

export default function PrivateLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <MainNavbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
