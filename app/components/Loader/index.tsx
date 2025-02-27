import React from 'react';

interface LoaderProps {
  size?: string; 
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'w-8 h-8', color = 'border-primary' }) => {
  return (
    <div
      className={`border-4 border-t-transparent rounded-full animate-spin ${size} ${color}`}
    />
  );
};

export default Loader;
