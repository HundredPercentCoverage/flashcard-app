import { ReactNode } from 'react'

export function Layout({ children }: { children?: ReactNode }) {
  return (
    <>
      <div className="w-full flex items-center justify-center py-4 bg-gray-700">
        <h1 className="text-5xl font-bold tracking-tight text-white">
          <em className="text-amber-500">Flash</em>Cards
        </h1>
      </div>
      <main>
        {children}
      </main>
    </>
  );
}
