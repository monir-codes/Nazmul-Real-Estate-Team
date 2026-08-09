export const uploadToImgBB = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  // Try to use environment variable, otherwise fallback to a default or error
  // Warning: For production, this should ideally go through a backend proxy to hide the API key
  // But for this agency demo, we'll use a direct frontend upload if a key is provided
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  
  if (!apiKey) {
    throw new Error("ImgBB API key is missing. Please add VITE_IMGBB_API_KEY to your .env.local file.");
  }

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  
  if (data.success) {
    return data.data.url;
  } else {
    throw new Error(data.error?.message || "Failed to upload image");
  }
};
