import React from 'react';
import BetBasket from '../bet/BetBasket';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
      <BetBasket />
    </div>
  );
};

export default MainLayout;
