/* eslint-disable react/no-unescaped-entities */
// import { Statistics } from "./Statistics";

export const About = () => {
  return (
    <section
      id="about"
      className="container py-24 sm:py-32"
    >
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src="/pilot.png"
            alt=""
            className="w-[300px] object-contain rounded-lg mx-auto" // Center the image horizontally
          />
          <div className="flex flex-col justify-center items-start text-start"> {/* Center text */}
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  About{" "}
                </span>
                Bighead
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
              Bighead is here to make managing your information easier and smarter. 
              Whether you're a student, a professional, or part of a team, Bighead helps you 
              organize, access, and interact with your documents seamlessly. Upload your files, 
              take notes, and even chat with your documents using our AI-powered assistant. 
              With advanced search technology, finding the right information has never been quicker. 
              Bighead also makes collaboration effortless by allowing you to create shared spaces, 
              making it the perfect tool for collective knowledge and teamwork.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
