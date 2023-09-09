/**
 * Convert a base64 string to a blob URL.
 *
 * @param {string} base64 - The base64 string of the video.
 * @returns {string} - The blob URL of the video.
 */
export const base64ToBlobUrl = (base64) => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'video/mp4' }); // Adjust the MIME type as needed
  const blobUrl = URL.createObjectURL(blob);
  return blobUrl;
};
