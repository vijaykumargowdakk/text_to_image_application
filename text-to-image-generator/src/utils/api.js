export async function queryImage(prompt, model) {
  try {
    console.log('Fetching image with model:', model);
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_HUGGING_FACE_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      console.error('Response status:', response.status);
      throw new Error(`Failed to generate image: ${response.statusText}`);
    }

    const result = await response.blob();
    console.log('Image fetched successfully');
    return URL.createObjectURL(result); // Convert blob to URL for image display
  } catch (error) {
    console.error("Error generating image:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
}
