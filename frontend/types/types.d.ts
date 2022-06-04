type TExternalArticle = {
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
  TExternalArticle,
  "title" | "author" | "media" | "rights" | "topic" | "id"
>;

type TArticle = {
  id: number;
  title: string;
  created_at: string;
  summary: string;
  section: {
    id: number;
    name: string;
  };
  tags: { id: number; name: string }[];
  content: string;
  preview: string;
  author: TUser;
};

type TUser = {
  avatar: string;
  id: number;
  name: string;
  headline: string;
  email: string;
  description: string;
  socials: string[];
  role: "user" | "contributor";
};

type TUserPreview = Pick<TUser, "id" | "name" | "avatar">;

type TRegisterInput = {
  email: string;
  password: string;
  role?: TUser["role"];
  name: string;
};

type TLoginInput = {
  email: string;
  password: string;
};

type TAuthResponse = {
  message: string;
  access_token: string;
  token_type: "Bearer ";
  user?: TUserPreview;
  role?: TUser["role"];
  errors: { [P in TRegisterInput]: string[] };
};
