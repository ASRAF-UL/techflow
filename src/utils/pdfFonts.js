// utils/pdfFonts.js
export const loadKoreanFont = async () => {
  try {
    // For production (when hosted):
    const response = await fetch("/fonts/NotoSansKR-Regular.otf");

    // For local development (create-react-app):
    // const response = await fetch(process.env.PUBLIC_URL + '/fonts/NotoSansKR-Regular.otf');

    if (!response.ok) throw new Error("Font loading failed");
    return await response.arrayBuffer();
  } catch (error) {
    console.error("Failed to load Korean font:", error);
    throw error;
  }
};
