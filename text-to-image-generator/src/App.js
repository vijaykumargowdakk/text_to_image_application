// src/App.js

import React, { useState } from 'react';
import { queryImage } from './utils/api';
import InputField from './components/InputField';
import GenerateButton from './components/GenerateButton';
import ImageDisplay from './components/ImageDisplay';

function App() {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('stabilityai/stable-diffusion-3.5-large');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setError(''); // Clear any previous errors
    setImageUrl(''); // Clear any previous image
    try {
      const image = await queryImage(prompt, model);
      setImageUrl(image);
    } catch (err) {
      setError('Unable to generate image. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient">
      <h1 className="text-4xl font-bold text-white mb-4">Text to Image Generator</h1>

      <InputField prompt={prompt} setPrompt={setPrompt} />

      <select
        className="mb-4 p-2 rounded border w-full max-w-md"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      >
        <option value="stabilityai/stable-diffusion-3.5-large">Stable Diffusion 3.5</option>
        <option value="black-forest-labs/FLUX.1-dev">FLUX.1 Dev</option>
        <option value="XLabs-AI/flux-RealismLora">Flux Realism Lora</option>
        <option value="gokaygokay/Flux-Seamless-Texture-LoRA">Flux Seamless Texture LoRA</option>
        <option value="CompVis/stable-diffusion-v1-4">Stable Diffusion v1.4</option>
      </select>

      <GenerateButton onGenerate={handleGenerate} />

      {error && <p className="text-red-500 mt-4">{error}</p>}
      <ImageDisplay imageUrl={imageUrl} />
    </div>
  );
}

export default App;
