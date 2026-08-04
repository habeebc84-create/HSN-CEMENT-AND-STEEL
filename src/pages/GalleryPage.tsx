import React from 'react';
import { Gallery } from '../components/Gallery';

export const GalleryPage: React.FC = () => {
  return (
    <div className="py-10 bg-transparent min-h-screen relative z-10">
      <Gallery />
    </div>
  );
};
