import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { ChatIcon, PlaneIcon, SearchIcon } from "../components/Icons";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <PlaneIcon />,
    title: "Upload Your Docs",
    description:
      "Easily upload and store your files in one secure place. Bighead supports various formats, simplifying document management.",
  },
  {
    icon: <DocumentTextIcon className="w-12 h-12 mt-2 text-primary" />,
    title: "Create Your Notes",
    description:
      "Add notes and highlight key information directly on your documents. Keep your insights and annotations organized for future reference.",
  },
  {
    icon: <SearchIcon />,
    title: "Discover Smarter",
    description:
      "Use advanced vector search technology to find information quickly and accurately. Get precise results, making data retrieval effortless.",
  },
  {
    icon: <ChatIcon />,
    title: "Chat with Your Data",
    description:
      "Interact with your documents through AI-driven chat. Get instant answers and summaries powered by the Gemini API, enhancing your workflow.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        How It{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Works ?{" "}
        </span>
       
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
      Bighead simplifies your document management with intuitive features
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
