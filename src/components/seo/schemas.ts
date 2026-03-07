import { BASE_URL } from '@/lib/constants';

export const softwareApplication = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'xBPP',
  applicationCategory: 'DeveloperApplication',
  description:
    'xBPP (Execution Boundary Permission Protocol) is the open standard for governing autonomous AI agent payments. Define policies, enforce spending limits, and integrate with x402. Built by VanarChain.',
  url: BASE_URL,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: {
    '@type': 'Organization',
    name: 'VanarChain',
  },
};

export const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VanarChain',
  url: 'https://vanarchain.com',
  sameAs: [BASE_URL],
};

export const webSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'xBPP Protocol',
  url: BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export function faqPage(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
