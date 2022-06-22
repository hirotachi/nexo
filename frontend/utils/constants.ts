import {
  faBitbucket,
  faFacebookF,
  faGithub,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import faLink from "@icons/light/faLink";

export const socialIcons = {
  facebook: faFacebookF,
  twitter: faTwitter,
  linkedin: faLinkedinIn,
  instagram: faInstagram,
  github: faGithub,
  bitbucket: faBitbucket,
  other: faLink,
};

export const routes = [
  "home",
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

export const socials = [
  "https://www.facebook.com/vice",
  "https://www.instagram.com/vice",
  "https://twitter.com/vice",
  "https://www.reddit.com/user/vice",
  "https://vicemag.tumblr.com/",
  "https://www.youtube.com/user/vice",
  "https://www.pinterest.com/vicemag",
];

export const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
export const MEDIA_STACK_API_KEY = process.env.NEXT_PUBLIC_MEDIA_STACK_API_KEY;
export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const NEWS_LANGUAGE = "en";

export const pageSize = 10;
