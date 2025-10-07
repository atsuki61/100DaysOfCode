import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '100DaysOfCode - Day47 Offline Notes',
    short_name: 'Offline Notes',
    description: 'Day47: オフライン対応のメモ帳（Service Worker + Manifest）',
    start_url: '/day47-offline-notes',
    scope: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#0ea5e9',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/images/no-image.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}




