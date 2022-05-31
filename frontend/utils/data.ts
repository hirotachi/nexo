import { pick } from "@utils/helpers";

export const articleData: TArticle = {
  title:
    "Biden under fire over $60bn Ukraine aid amid US economic woes 'Take care of us first!'",
  author: "Thibault Spirlet",
  published_date: "2022-05-20 12:36:00",
  published_date_precision: "full",
  link: "https://www.express.co.uk/news/world/1613449/joe-biden-60-billion-dollar-ukraine-aid-package-usa-economy-inflation-vn",
  clean_url: "express.co.uk",
  excerpt:
    "JOE BIDEN is turning a blind eye to Americans' problems at home by sending yet another multi-billion dollar package to Ukraine, a political commentator raged.",
  summary:
    "Political commentator Scottie Nell Hughes bashed US President Joe Biden for sending pushing through another multi-billion package to Ukraine as she accused him of ignoring US domestic issues. The United States Senate agreed in a bipartisan vote to support President Biden's $40billion aid package to provide Kyiv with weapons and military help to defend themselves against Putin's Russia. The package is the United States' highest package sent to Ukraine yet as Russia focuses its effort on the eastern Donbas region.",
  rights: "express.co.uk",
  rank: 555,
  topic: "world",
  country: "GB",
  language: "en",
  authors: ["Thibault Spirlet"],
  media:
    "https://cdn.images.express.co.uk/img/dynamic/78/1200x712/1613449_1.jpg",
  is_opinion: false,
  twitter_account: null,
  _score: 22.365736,
  _id: "e9fdb87fc03c2cd5166dec6d136bafc3",
};

const omittedArticleFields = [
  "author",
  "id",
  "media",
  "rights",
  "title",
  "topic",
] as (keyof TArticle)[];

export const articlePreview: TArticlePreview = pick(
  articleData,
  omittedArticleFields
);

export const userData: TUser = {
  avatar:
    "https://video-images.vice.com/test-uploads/contributors/58b97c7396dd3839271a3a39/lede/1583531539948-_0017133.jpeg?crop=0.9349xw:1xh;0.0244xw,0xh",
  id: 1,
  description: `Anya Zoledziowski is an award-winning staff reporter at VICE World News. Her reporting focuses on a wide-range of social justice issues, including Indigenous affairs, race, politics, sex worker rights, and the disproportionate harm experienced by racialized communities as the climate crisis worsens. She graduated top of her class from the University of British Columbia Master of Journalism program in 2018, and has since won multiple awards for her investigative reporting delving into hate crimes targeting Indigenous women at the hands of transient workers who move into “man camps,” temporary housing units near resource extraction sites. She also won the CAJ Reconciliation Award in 2021 for her Indigenous affairs reporting. Prior to working at VICE, she was with CBC, now defunct StarMetro Calgary, and freelanced all over. `,
  email: "anya.zoledziowski@vice.com",
  headline: "Senior Reporter",
  name: "Anya Zoledziowski",
  socials: ["https://twitter.com/@anyazoledz"],
};
