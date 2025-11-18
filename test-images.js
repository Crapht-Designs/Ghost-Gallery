// Simple test to verify image loading
const testImageLoad = () => {
  const images = [
    "/dark-hoodie-front.png",
    "/red-skull.png",
    "/wild-west-front.png",
    "/angel-front-hoodie.png",
    "/sweater-front.png",
    "/hoodie.png",
    "/teeth-hoodie-front.png",
    "/shirt.png",
    "/punk.png",
    "/grey-hoodie-front.png",
    "/brown-hoodie-front.png",
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