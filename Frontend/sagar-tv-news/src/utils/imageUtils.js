import { API_BASE_URL } from '../config/api';

/**
 * Converts a relative image URL to an absolute URL
 * @param {string} path - The image path/URL
 * @returns {string} - The absolute URL for the image
 */
export const getImageUrl = (path) => {
  if (!path) {
    return '';
  }

  if (path.startsWith('http')) {
    return path;
  }

  return `${API_BASE_URL}${path}`;
};

/**
 * Extracts the relative path from an absolute URL
 * @param {string} url - The absolute URL
 * @returns {string} - The relative path
 */
export const stripBaseUrl = (url) => {
  if (!url) {
    return '';
  }

  if (url.startsWith(API_BASE_URL)) {
    return url.replace(API_BASE_URL, '');
  }

  return url;
};
