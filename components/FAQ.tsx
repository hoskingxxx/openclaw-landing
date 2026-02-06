/**
 * FAQ Component - Displays FAQ with schema.org structured data
 *
 * Props:
 * - items: Array of FAQ items with { question, answer }
 */

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  return (
    <>
      {/* Schema.org structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />

      {/* Visual FAQ display */}
      <div itemScope itemType="https://schema.org/FAQPage">
        {items.map((item, index) => (
          <div key={index} itemScope itemType="https://schema.org/Question" itemProp="mainEntity">
            <h3 itemProp="name">Q: {item.question}</h3>
            <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
              <p itemProp="text">
                <strong>A:</strong> {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
