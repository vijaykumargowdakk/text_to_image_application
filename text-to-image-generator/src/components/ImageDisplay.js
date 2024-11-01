import React from 'react';

function ImageDisplay({ imageUrl }) {
  return (
    <div className="mt-4 w-full flex justify-center">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Generated"
          className="rounded shadow-lg w-full h-auto max-h-[70vh] object-contain"
        />
      ) : (
        <p className="text-gray-700">No image generated yet. Enter a prompt and click "Generate Image."</p>
      )}
    </div>
  );
}

export default ImageDisplay;
