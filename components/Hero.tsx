/* eslint-disable react/no-unescaped-entities */
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { HeroCards } from "./HeroCards";
import { Button, buttonVariants } from "./ui/button";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
          Let us&nbsp;
            <span className="inline bg-gradient-to-r from-[#ca6371]  to-[#912143] text-transparent bg-clip-text">
             remember
            </span>{" "}
            
          </h1>{" "}
          so you don't have to!{" "}
          
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          An AI powered personal knowledge management platform with everything you need.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
        <Link href="/dashboard" passHref>
            <Button className="w-full md:w-1/3">Get Started</Button>
          </Link>

          <a
            rel="noreferrer noopener"
            href="https://github.com/umesh181/bighead"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Github Repository
            <GitHubLogoIcon className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
