import React from 'react';
import BetSlipContainer from '~/containers/bet/BetSlipContainer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
      <BetSlipContainer />
    </div>
  );
};

export default MainLayout;
