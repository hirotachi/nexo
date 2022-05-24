// type TArticlePreview = {
//   title: string;
//   image: string;
//   author: string;
//   source: string;
//   category: string;
//   id: number;
// };

type TArticle = {
  title: string;
  author: string;
  published_date: string;
  published_date_precision: string;
  link: string;
  clean_url: string;
  excerpt: string;
  summary: string;
  rights: string;
  rank: number;
  topic: string;
  country: string;
  language: string;
  authors: string[];
  media: string;
  twitter_account?: string | null;
  _score: number;
  is_opinion: boolean;
  _id?: string;
  id?: number;
};

type TArticlePreview = Pick<
  TArticle,
  "title" | "author" | "media" | "rights" | "topic" | "id"
>;
