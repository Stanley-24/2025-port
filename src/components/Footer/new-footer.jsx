"use client";

import {
  Footer,
  FooterCopyright,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";

import {
    BsX,
  BsGithub,
  BsInstagram,
  BsLinkedin,
} from "react-icons/bs";

import { FaX } from "react-icons/fa6";


import { Button } from "@/components/ui/button";

const FooterComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>

      {/* 🔻 FOOTER */}
      <Footer className="bg-black text-gray-300 border-t border-gray-800">
        <div className="w-full">

          {/* Top Section */}
          <div className="grid w-full grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">

            {/* Brand */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">
                Stanley Owarieta
              </h2>
              <p className="text-sm text-gray-400">
                All things computer, software, and technology. Building the future one line of code at a time.
              </p>
            </div>

            {/* Product */}
            <div>
              <FooterTitle title="Product" className="text-white" />
              <FooterLinkGroup col>
                <FooterLink href="/revenue-retention-infrastructure">Revenue Retention Infrastructure</FooterLink>
                {/*<FooterLink href="#">Automations</FooterLink>*/}
              </FooterLinkGroup>
            </div>

            {/* Company */}
            <div>
              <FooterTitle title="Quick Links" className="text-white" />
              <FooterLinkGroup col>
                <FooterLink href="/about">About</FooterLink>
                <FooterLink href="https://medium.com/@stanley-24/last-year-i-debugged-my-life-these-5-books-were-the-fix-5a956db37891">Books i've read</FooterLink>
                <FooterLink href="https://medium.com/@stanley-24">Blog</FooterLink>
              </FooterLinkGroup>
            </div>

            {/* Legal */}
            <div>
              <FooterTitle title="Legal" className="text-white" />
              <FooterLinkGroup col>
                {/*<FooterLink href="#">Privacy Policy</FooterLink>*/}
                {/*<FooterLink href="#">Terms & Conditions</FooterLink>*/}
              </FooterLinkGroup>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="w-full bg-[#0a0a0a] px-6 py-6 flex flex-col sm:flex-row items-center justify-between border-t border-gray-800">

            <FooterCopyright
              href="#"
              by=" Stanley Owarieta"
              year={currentYear}
              className="text-gray-500"
            />

            <div className="mt-4 flex space-x-6 sm:mt-0">
              <FooterIcon 
                href="https://x.com/Stanley_24_" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="X profile link" 
                icon={FaX} 
              />
              <FooterIcon 
                href="https://www.instagram.com/stan_d_dev/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram profile link" 
                icon={BsInstagram} 
              />
              <FooterIcon 
                href="https://www.linkedin.com/in/stanley-owarieta/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn profile link" 
                icon={BsLinkedin} 
              />
              <FooterIcon 
                href="https://github.com/Stanley-24" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub profile link" 
                icon={BsGithub} 
              />
            </div>
          </div>
        </div>
      </Footer>
    </>
  );
};

export default FooterComponent;