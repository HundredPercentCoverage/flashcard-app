import React, { ReactNode } from 'react'

export function Layout({ children }: { children?: ReactNode }) {
  return (
    <>
      <div className="w-full flex items-center justify-center py-4">
        <h1 className="text-5xl font-bold">Flash Cards</h1>
      </div>
      <main>
        {children}
      </main>
    </>
  );
}
