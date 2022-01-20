import React, { ReactNode } from 'react'

export function Layout({ children }: { children?: ReactNode }) {
  return (
    <>
      <div className="w-full flex items-center justify-center py-4">
        <h1 className="text-5xl font-bold tracking-tight"><em className="text-amber-500">Flash</em>Cards</h1>
      </div>
      <main>
        {children}
      </main>
    </>
  );
}
