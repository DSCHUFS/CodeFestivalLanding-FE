import fs from 'fs';
import { MetadataRoute } from 'next';
import path from 'path';

import { MENU } from '@/constants/menu';
import { METADATA } from '@/constants/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const menuEntries = MENU.map(menu => ({
    url: `${METADATA.url}${menu.href}`,
    priority: 0.9,
  }));
  const historyDirectory = path.join(process.cwd(), 'content/histories');
  const historyEntries = fs
    .readdirSync(historyDirectory)
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      const filePath = path.join(historyDirectory, fileName);
      return {
        url: `${METADATA.url}/festival/${encodeURIComponent(path.basename(fileName, '.mdx'))}`,
        lastModified: fs.statSync(filePath).mtime,
        priority: 0.9,
      };
    });

  return [
    {
      url: `${METADATA.url}`,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    ...historyEntries,
    ...menuEntries,
  ];
}
