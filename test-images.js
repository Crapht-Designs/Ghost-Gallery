// Simple test to verify image loading
const testImageLoad = () => {
  const images = [
    "/dark%20hoodie%20front.png",
    "/Red%20Skull.png", 
    "/wild%20west%20front.png",
    "/angel%20front%20hoodie.png",
    "/sweater%20front.png",
    "/hoodie.png",
    "/teeth%20hoodie%20front.png",
    "/shirt.png",
    "/punk.png",
    "/grey%20hoodie%20front.png",
    "/brown%20hoodie%20front.png",
    "/punk2.png"
  ];

  images.forEach(imagePath => {
    const img = new Image();
    img.onload = () => console.log(`✅ Loaded: ${imagePath}`);
    img.onerror = () => console.log(`❌ Failed: ${imagePath}`);
    img.src = imagePath;
  });
};

// Export for browser console
if (typeof window !== 'undefined') {
  window.testImageLoad = testImageLoad;
}

export { testImageLoad };