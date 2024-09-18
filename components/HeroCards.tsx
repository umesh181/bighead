import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { GitHubLogoIcon } from "@radix-ui/react-icons";
// import { Check, Linkedin, NotebookTabsIcon } from "lucide-react";
// import { LightBulbIcon } from "./Icons";
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { Check, NotebookTabsIcon } from "lucide-react";
import { Badge } from "./ui/badge";

export const HeroCards = () => {
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      {/* Testimonial */}
      <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <img 
      src="/search.png"
      alt="Magic Search" 
      className="h-12 w-12" 
    />

          <div className="flex flex-col">
            <CardTitle className="">Magic  Search...</CardTitle>
           
          </div>
        </CardHeader>

        <CardContent>Smarter search, smarter results </CardContent>
      </Card>

      {/* Team */}
      <Card className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="mt-8 flex justify-center items-center pb-2">
          <div className="absolute -top-12 flex justify-center">
            {["https://i.pravatar.cc/150?img=58", "https://i.pravatar.cc/150?img=32", "https://i.pravatar.cc/150?img=45", "https://i.pravatar.cc/150?img=12"].map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`user avatar ${index + 1}`}
                className={`rounded-full w-20 h-20 border-2 mt-3 border-white ${
                  index > 0 ? '-ml-4' : ''
                }`}
                style={{ zIndex: 4 - index }}
              />
            ))}
          </div>
          <CardTitle className="text-center">Team Collaboration</CardTitle>
          <CardDescription className="font-normal text-primary">
            Frontend Developers
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center pb-2">
          <p>
          Now Harry, Peter, John, and Jimmy can take notes and store documents together.
          </p>
        </CardContent>

        <CardFooter>
          <div>
            <a
              rel="noreferrer noopener"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Github icon</span>
              <NotebookTabsIcon className="w-5 h-5" />
            </a>
            <a
              rel="noreferrer noopener"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Document icon</span>
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-foreground w-5 h-5"
              >
                <title>documents</title>
                <path d="M6 2h10l6 6v14a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v14h12V6H6zM16 2v6h6l-6-6z" />
              </svg>
            </a>
            <a
              rel="noreferrer noopener"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Storage icon</span>
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-foreground w-5 h-5"
      >
        <title>Storage</title>
        <path d="M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v16h16V4H4zM6 6h12v2H6V6zm0 4h12v2H6v-2zm0 4h12v2H6v-2z" />
      </svg>
            </a>
          </div>
        </CardFooter>
      </Card>

      {/* Pricing */}
      <Card className="absolute top-[150px] left-[50px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="flex item-center justify-between">
            Free
            <Badge
              variant="secondary"
              className="text-sm text-primary"
            >
              Most popular
            </Badge>
          </CardTitle>
          <div>
            <span className="text-3xl font-bold">$0</span>
            <span className="text-muted-foreground"> /month</span>
          </div>

          <CardDescription>
          Upload all your documents effortlessly store them for free and access them anytime, anywhere!
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button className="w-full">Upload </Button>
        </CardContent>

        <hr className="w-4/5 m-auto mb-4" />

        <CardFooter className="flex">
          <div className="space-y-4">
            {["Chat with your Docs", "Collaboration", "Easy Access"].map(
              (benefit: string) => (
                <span
                  key={benefit}
                  className="flex"
                >
                  <Check className="text-green-500" />{" "}
                  <h3 className="ml-2">{benefit}</h3>
                </span>
              )
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Service */}
      <Card className="absolute w-[350px] -right-[10px] bottom-[35px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
          <DocumentTextIcon className="w-12 h-12 text-primary" />
          </div>
          <div>
            <CardTitle>Take your Notes</CardTitle>
            <CardDescription className="text-md mt-2">
            Capture and organize your thoughts effortlessly with Bighead’s note-taking feature
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
