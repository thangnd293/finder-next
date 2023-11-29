import Logo from "@/components/Logo";
import { EnvelopeClosedIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-accent-background py-6">
      <div className="container mx-auto flex flex-col-reverse items-center justify-between gap-6 text-sm md:flex-row">
        <div className="flex w-full items-center justify-between gap-4 text-muted-foreground md:w-auto md:justify-start">
          <Logo /> <span>Copyright © {new Date().getFullYear()}</span>
        </div>
        <div className="flex w-full items-center justify-between space-x-6 md:w-auto md:justify-normal">
          <p>
            <span className="text-accent">
              <EnvelopeClosedIcon className="mb-1 inline-block" /> Liên hệ:{" "}
            </span>
            <a
              className="text-white dark:text-black"
              href="mailto:thangnd293@gmail.com"
            >
              thangnd293@gmail.com
            </a>
          </p>
          <a
            className="block shrink-0 gap-2 rounded-sm bg-background px-1.5"
            href="https://www.linkedin.com/in/nguyendacthang/"
            target="_blank"
          >
            <LinkedInLogoIcon className="mb-1 mr-2 inline-block text-blue-600" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
