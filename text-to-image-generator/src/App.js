import React, { useState } from 'react';
import { queryImage } from './utils/api';
import InputField from './components/InputField';
import GenerateButton from './components/GenerateButton';
import ImageDisplay from './components/ImageDisplay';

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
      <div className="flex flex-col md:flex-row w-full max-w-6xl">
        {/* Left Box for inputs */}
        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-xl mb-6 md:mb-0">
          <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Text to Image Generator</h1>

          <InputField prompt={prompt} setPrompt={setPrompt} />

          <select
            className="mb-4 p-2 rounded border w-full"
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

          {loading && <p className="text-blue-500 mt-4 text-center">Generating image, please wait...</p>}
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          {imageUrl && (
            <button
              onClick={handleDownload}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full"
            >
              Download Image
            </button>
          )}
        </div>

        {/* Right Box for Image display */}
        {imageUrl && (
          <div className="w-full md:w-2/3 flex flex-col items-center justify-center">
            <ImageDisplay imageUrl={imageUrl} />
          </div>
        )}
      </div>

      <footer className="mt-10 text-center">
        <p className="text-white">Created by Vijay Kumar Gowda K K</p>
        <div className="flex justify-center mt-2">
          <a href="https://github.com/vijaykumargowdakk" className="text-yellow-400 mx-2">
            <i className="fab fa-github fa-2x"></i>
          </a>
          <a href="mailto:rvit21bis065.rvitm@rvei.edu.in" className="text-yellow-400 mx-2">
            <i className="fas fa-envelope fa-2x"></i>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
