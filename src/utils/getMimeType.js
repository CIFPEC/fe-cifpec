const getMimeType = (url) => {
  if (url.endsWith('.svg')) return 'image/svg+xml';
  if (url.endsWith('.png')) return 'image/png';
  if (url.endsWith('.ico')) return 'image/x-icon';
  return 'image/x-icon'; // fallback paling selamat
};
export default getMimeType;