import { MetadataRoute } from 'next';

import { MENU } from '@/constants/menu';
import { METADATA } from '@/constants/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = MENU.map(menu => ({
    url: `${METADATA.url}${menu.href}`,
    ...('date' in menu && { lastModified: menu.date }),
    priority: 0.9,
  }));

  return [
    {
      url: `${METADATA.url}`,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    ...entries,
  ];
}
