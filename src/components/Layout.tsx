import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto px-2 sm:px-4 md:px-8 lg:px-16 xl:px-32">
      {children}
    </div>
  );
};

export default Layout;