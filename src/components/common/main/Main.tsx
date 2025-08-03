import React from 'react';

export const Main: React.FC<React.PropsWithChildren> = ({ children }) => (
  <main className="mt-[3.5em] w-[100vw] h-[calc(100vh - 3.6em)]">
    {children}
  </main>
);
