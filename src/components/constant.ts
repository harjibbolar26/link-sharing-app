import { TbBrandGithubFilled } from "react-icons/tb";
import { SiFrontendmentor } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitch } from "react-icons/fa";
import { BiLogoDevTo } from "react-icons/bi";
import { SiCodewars } from "react-icons/si";
import { FaCodepen } from "react-icons/fa";
import { FaFreeCodeCamp } from "react-icons/fa";
import { FaGitlab } from "react-icons/fa6";
import { FaHashnode } from "react-icons/fa6";
import { FaStackOverflow } from "react-icons/fa";
import { ReactNode } from "react";
import { IconType } from "react-icons";

interface PlatformOption {
  display: string;
  icon: IconType;
  value: string;
}

export const PlatformOptions: PlatformOption[] = [
  { display: "Github", value: "Github", icon: TbBrandGithubFilled },
  {
    display: "Frontend Mentor",
    value: "FrontendMentor",
    icon: SiFrontendmentor,
  },
  { display: "Twitter", value: "Twitter", icon: FaTwitter },
  { display: "LinkedIn", value: "LinkedIn", icon: FaLinkedin },
  { display: "Youtube", value: "Youtube", icon: FaYoutube },
  { display: "Facebook", value: "Facebook", icon: FaFacebook },
  { display: "Twitch", value: "Twitch", icon: FaTwitch },
  { display: "Dev.to", value: "Devto", icon: BiLogoDevTo },
  { display: "Codewars", value: "Codewars", icon: SiCodewars },
  { display: "Codepen", value: "Codepen", icon: FaCodepen },
  { display: "freeCodeCamp", value: "freeCodeCamp", icon: FaFreeCodeCamp },
  { display: "GitLab", value: "GitLab", icon: FaGitlab },
  { display: "Hashnode", value: "Hashnode", icon: FaHashnode },
  { display: "Stack Overflow", value: "StackOverflow", icon: FaStackOverflow },
];

export const PlatformColors: { [key: string]: string } = {
    "Github": "[#1A1A1A]",
    "Twitter": "[#43B7E9",
    "LinkedIn": "[#2D68FF", // Example additional colors
    "Youtube": "[#EE3939", // Example additional colors
    "Facebook": "[#2442AC]", // Example additional colors
    "Twitch": "[#EE3FC8]", // Example additional colors
    "Dev.to": "[#333333]", // Example additional colors
    "Codewars": "[#8A1A50]", // Example additional colors
    "Codepen": "[yellow-400]", // Example additional colors
    "freeCodeCamp": "[#302267]", // Example additional colors
    "GitLab": "[#EB4925]", // Example additional colors
    "Hashnode": "[#0330D1]", // Example additional colors
    "Stack Overflow": "[#EC7100]", // Example additional colors
  };
