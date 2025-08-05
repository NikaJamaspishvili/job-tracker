'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-error_color mb-2">Oops, Error detected</h1>
          <p className="text-gray-600 mb-4">
            {process.env.NODE_ENV === 'development'
              ? error.message
              : 'An unexpected error occurred. Please try again later.'}
          </p>
          <button
            onClick={() => reset()}
            className="mt-2 px-4 py-2 bg-error_color text-white rounded bg-red-600 basicBtnAnimation cursor-pointer"
          >
            Try Again
          </button>
        </div>
        </div>
  );
}