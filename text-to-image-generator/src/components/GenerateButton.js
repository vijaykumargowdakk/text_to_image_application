// src/components/GenerateButton.js

import React from 'react';

function GenerateButton({ onGenerate }) {
  return (
    <button
      onClick={onGenerate}
      className="px-4 py-2 bg-white text-blue-500 rounded hover:bg-gray-200"
    >
      Generate Image
    </button>
  );
}

export default GenerateButton;
