export const API_URL = `${import.meta.env.VITE_API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`;

export const buildApiEndpoint = (endpoint: string): string => {
  const trimmedEndpoint = endpoint.replace(/^\/+/, ''); 
  return `${API_URL}/${trimmedEndpoint}`;
};

export const buildCdnUrl = (filename?: string) =>
  filename ? `${CDN_URL}/${encodeURIComponent(filename)}` : '';

export const categoryMap = {
  'софт-скил': 'card__category_soft',
  'хард-скил': 'card__category_hard',
  'кнопка': 'card__category_button',
  'дополнительное': 'card__category_additional',
  'другое': 'card__category_other',
} as const;

export const settings = {};