'use client';

import React from 'react';

export function LoadingSpinner() {
  return (
    <div
      className="inline-block h-4 w-4"
      style={{
        border: '2px solid #e5e7eb',
        borderTopColor: '#000',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}
    />
  );
}

export default LoadingSpinner;
