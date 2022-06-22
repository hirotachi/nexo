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

export const defaultImage =
  "https://images.unsplash.com/photo-1623039405147-547794f92e9e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=826&q=80";

export const externalURL = `http://api.mediastack.com/v1/news?access_key=${MEDIA_STACK_API_KEY}&languages=${NEWS_LANGUAGE}&limit=${pageSize}`;
