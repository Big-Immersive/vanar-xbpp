interface StructuredDataProps {
  data: Record<string, unknown>;
}

export function StructuredData({ data }: StructuredDataProps) {
  // Safe: JSON.stringify only processes known schema objects, no user input
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
