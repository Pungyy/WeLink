import React from 'react';
import MainNavbar from './MainNavbar';

export default function PrivateLayout({ children }) {
  return (
    <div className="pb-20">
      <MainNavbar />
      {children}
    </div>
  );
}
