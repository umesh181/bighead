"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Is this free?",
    answer: "Yes. It is free upto 15gb.",
    value: "item-1",
  },
  {
    question: "What types of documents can I upload to Bighead?",
    answer:
      "You can upload a variety of file types including PDFs, Word documents, and more. Bighead supports multiple formats to help you organize all your important documents in one place.",
    value: "item-2",
  },
  {
    question:
      "Can I collaborate with others using Bighead?",
    answer:
      "Yes, Bighead supports collaboration by allowing you to share documents and notes with others. You can create shared workspaces to facilitate teamwork and collective knowledge management.",
    value: "item-3",
  },
  {
    question: "What is vector search, and how does it benefit me?",
    answer: "Vector search technology enables accurate and efficient retrieval of information by analyzing the context and meaning of your queries. This helps you find relevant data quickly and precisely.",
    value: "item-4",
  },
  {
    question:
      "How does the AI-powered chat feature work?",
    answer:
      "Bighead’s AI-powered chat uses the Gemini API to interact with your documents, allowing you to ask questions, get summaries, and receive insights directly from your content.",
    value: "item-5",
  },
];

export const FAQ = () => {
  return (
    <section
      id="faq"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full AccordionRoot"
      >
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem
            key={value}
            value={value}
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="#newsletter"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
