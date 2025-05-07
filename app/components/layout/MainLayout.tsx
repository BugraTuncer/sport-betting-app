import React from 'react';
import BetBasketContainer from '~/containers/bet/BetBasketContainer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
      <BetBasketContainer />
    </div>
  );
};

export default MainLayout;
