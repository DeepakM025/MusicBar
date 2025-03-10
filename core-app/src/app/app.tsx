import React, { Suspense } from 'react';

const MusicLibrary = React.lazy(() => import('../../../music-library/src/components/MusicLibrary/MusicLibrary'));

export default function App() {
  return (
    <div>
      <h1>Core App</h1>
      <Suspense fallback={<div>Loading Music Library...</div>}>
        <MusicLibrary />
      </Suspense>
    </div>
  );
}
