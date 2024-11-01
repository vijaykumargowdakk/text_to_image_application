// src/components/InputField.js

import React from 'react';

function InputField({ prompt, setPrompt }) {
  return (
    <input
      className="mb-4 p-2 rounded border w-full max-w-md"
      type="text"
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      placeholder="Enter your prompt here"
    />
  );
}

export default InputField;
