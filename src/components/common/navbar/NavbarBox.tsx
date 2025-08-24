import React from 'react';

export const NavbarBox: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="flex bg-[#061623] h-[3.5em] w-[100vw] absolute top-0 left-0 z-10 shadow-[0.1em]">
    {children}
  </div>
);
