export function getDownloadUrl(item) {
  if (!item) return null;
  return `${import.meta.env.VITE_DIRECTUS_URL}/${item}`;
}

