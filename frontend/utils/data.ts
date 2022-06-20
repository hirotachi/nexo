import { pick } from "@utils/helpers";

export const externalArticleData: TExternalArticle = {
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
] as (keyof TExternalArticle)[];

export const articlePreview: TArticlePreview = pick(
  externalArticleData,
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
  role: "contributor",
  socials: ["https://twitter.com/@anyazoledz"],
};

export const articleData: TArticle = {
  author: userData,
  content: "article content",
  created_at: new Date().toLocaleDateString(),
  id: 0,
  section: { id: 0, name: "news" },
  summary:
    "Heard repeatedly denied she was after Depp’s money and told the court she had pledged her $7 million divorce settlement to charity.",
  topics: Array(8)
    .fill({ name: "tester" })
    .map((v, i) => ({ name: `${v.name}-${i}`, id: i + 1 })),
  title:
    "‘You Wanted Mr. Depp’s Money’: Johnny Depp’s Lawyers Cross-Examine Amber Heard",
  preview:
    "https://video-images.vice.com/articles/62851e67f9ba8f009eb009ad/lede/1652891241464-raquel-pennington-amber-heard.png?crop=1xw:1xh;center,center&resize=442:*",
};
