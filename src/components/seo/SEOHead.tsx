import { Helmet } from 'react-helmet-async';
import { BASE_URL, SITE_NAME, TWITTER_HANDLE } from '@/lib/constants';

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

export function SEOHead({ title, description, path = '/', image }: SEOHeadProps) {
  const url = `${BASE_URL}${path}`;
  const ogImage = image || `${BASE_URL}/og-image.png`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
