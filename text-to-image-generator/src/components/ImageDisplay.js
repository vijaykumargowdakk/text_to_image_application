// src/components/ImageDisplay.js

import React from 'react';

function ImageDisplay({ imageUrl }) {
  return (
    <div className="mt-4">
      {imageUrl ? (
        <img src={imageUrl} alt="Generated" className="rounded shadow-lg max-w-full h-auto" />
      ) : (
        <p className="text-white">No image generated yet. Enter a prompt and click "Generate Image."</p>
      )}
    </div>
  );
}

export default ImageDisplay;
