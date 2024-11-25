// Updated src/App.js

import React, { useState } from 'react';
import { queryImage } from './utils/api';
import InputField from './components/InputField';
import GenerateButton from './components/GenerateButton';
import ImageDisplay from './components/ImageDisplay';
import { FaGithub, FaEnvelope } from 'react-icons/fa';

function App() {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('stabilityai/stable-diffusion-3.5-large');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setError('');
    setImageUrl('');
    setLoading(true);
    try {
      const image = await queryImage(prompt, model);
      setImageUrl(image);
    } catch (err) {
      setError('Unable to generate image. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'generated-image.png';
      link.click();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 animate-gradient">
      <div className="flex flex-col md:flex-row w-full max-w-6xl gap-8">
        {/* Left Box for inputs */}
        <div className="w-full md:w-1/3 bg-white p-8 rounded-2xl shadow-xl transition-transform transform hover:scale-105">
          <h1 className="text-4xl font-extrabold text-purple-700 mb-6 text-center">Text to Image Generator</h1>

          <InputField prompt={prompt} setPrompt={setPrompt} />

          <select
            className="mb-4 p-3 rounded-md border w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
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

          {loading && <p className="text-blue-500 mt-4 text-center animate-pulse">Generating image, please wait...</p>}
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          {imageUrl && (
            <button
              onClick={handleDownload}
              className="mt-4 px-4 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 w-full shadow-lg transition-transform transform hover:scale-105"
            >
              Download Image
            </button>
          )}
        </div>

        {/* Right Box for Image display */}
        {imageUrl && (
          <div className="w-full md:w-2/3 flex flex-col items-center justify-center transition-all duration-500">
            <ImageDisplay imageUrl={imageUrl} />
          </div>
        )}
      </div>

      <footer className="mt-8 text-center">
                <p className="text-white text-lg font-medium">
                    Created by : Vijay Kumar Gowda K K
                </p>
                <div className="flex justify-center items-center gap-4 mt-2">
                    <a
                        href="https://github.com/vijaykumargowdakk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-300 hover:text-yellow-400 transition duration-200"
                    >
                        <FaGithub className="text-2xl" />
                    </a>
                    <a
                        href="mailto:rvit21bis065.rvitm@rvei.edu.in"
                        className="text-yellow-300 hover:text-yellow-400 transition duration-200"
                    >
                        <FaEnvelope className="text-2xl" />
                    </a>
                </div>
            </footer>
    </div>
  );
}

export default App;
