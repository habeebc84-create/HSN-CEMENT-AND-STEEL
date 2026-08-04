export const compressImageFile = (
  file: File, 
  maxWidth = 1200, 
  maxHeight = 1200, 
  quality = 0.82
): Promise<string> => {
  return new Promise((resolve) => {
    // Fail-safe helper using standard FileReader
    const fallbackFileReader = () => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve((e.target?.result as string) || '');
      };
      reader.onerror = () => {
        resolve('');
      };
      reader.readAsDataURL(file);
    };

    try {
      const objectUrl = URL.createObjectURL(file);
      const img = new Image();

      img.onload = () => {
        try {
          let width = img.width || 800;
          let height = img.height || 600;

          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            URL.revokeObjectURL(objectUrl);
            fallbackFileReader();
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          URL.revokeObjectURL(objectUrl);
          resolve(dataUrl);
        } catch {
          URL.revokeObjectURL(objectUrl);
          fallbackFileReader();
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        fallbackFileReader();
      };

      img.src = objectUrl;
    } catch {
      fallbackFileReader();
    }
  });
};
