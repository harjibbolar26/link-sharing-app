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
  "Github": "bg-[#1A1A1A]",
  "Frontend Mentor": "bg-[#FFFFFF]",
  "Twitter": "bg-[#43B7E9]",
  "LinkedIn": "bg-[#2D68FF]",
  "Youtube": "bg-[#EE3939]",
  "Facebook": "bg-[#2442AC]",
  "Twitch": "bg-[#EE3FC8]",
  "Dev.to": "bg-[#333333]",
  "Codewars": "bg-[#8A1A50]",
  "Codepen": "bg-[#000000]",
  "freeCodeCamp": "bg-[#302267]",
  "GitLab": "bg-[#EB4925]",
  "Hashnode": "bg-[#0330D1]",
  "Stack Overflow": "bg-[#EC7100]",
};

export const PlatformIcons: { [key: string]: IconType } = {
  "Github": TbBrandGithubFilled,
  "Frontend Mentor": SiFrontendmentor,
  "Twitter": FaTwitter,
  "LinkedIn": FaLinkedin,
  "Youtube": FaYoutube,
  "Facebook": FaFacebook,
  "Twitch": FaTwitch,
  "Dev.to": BiLogoDevTo,
  "Codewars": SiCodewars,
  "Codepen": FaCodepen,
  "freeCodeCamp": FaFreeCodeCamp,
  "GitLab": FaGitlab,
  "Hashnode": FaHashnode,
  "Stack Overflow": FaStackOverflow,
};
