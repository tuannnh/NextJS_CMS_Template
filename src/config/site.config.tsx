import { Metadata } from 'next';
import logoImg from '@public/smartparking_logo.png';
import { LAYOUT_OPTIONS } from '@/config/enums';
import logoIconImg from '@public/smartparking_logo.png';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'SmartParking - Admin Dashboard',
  description: `Admin dashboard management of SmartParking Solutions`,
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} ` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title}` : title,
      description,
      url: 'https://isomorphic-furyroad.vercel.app',
      siteName: 'SmartParking', // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: 'https://github.com/FPT-Capstone-Group/Smart_Parking_Desktop/blob/main/Resources/assets/login-bg.png',
        width: 1200,
        height: 630,
      },
      locale: 'vi_VN',
      type: 'website',
    },
  };
};
