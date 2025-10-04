export const exportToPDF = async (elementId: string, filename: string = 'resume.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const canvas = document.createElement('canvas');
    const scale = 2;
    const rect = element.getBoundingClientRect();

    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(scale, scale);

    const data = await new Promise<string>((resolve) => {
      const tempCanvas = canvas;
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(element);

      const img = new Image();
      const svg = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svg);

      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        resolve(tempCanvas.toDataURL('image/png'));
      };

      img.src = url;
    });

    window.print();
  } catch (error) {
    console.error('Error generating PDF:', error);
    window.print();
  }
};
