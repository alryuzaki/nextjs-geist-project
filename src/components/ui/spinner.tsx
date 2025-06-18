'use client';

import React from 'react';

export function Spinner({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`inline-block h-4 w-4 rounded-full border-2 border-gray-300 border-t-black ${className}`}
      style={{ animation: 'spin 1s linear infinite' }}
      role="status"
      aria-label="Loading"
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Spinner;
