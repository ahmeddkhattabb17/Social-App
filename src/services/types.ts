export const TOKEN = "route-posts-token";
export const USER = "route-posts-user";
export const LIMIT = 10;

export type AppUser = {
  _id: string;
  name: string;
  username?: string;
  email?: string;
  photo?: string;
  followers?: unknown[];
  following?: unknown[];
};

export type Comment = {
  _id: string;
  text?: string;
  body?: string;
  content?: string;
  image?: string;
  photo?: string;
  createdAt?: string;
  user?: AppUser;
  createdBy?: AppUser;
  likes?: unknown[];
};

export type Post = {
  _id: string;
  body?: string;
  text?: string;
  content?: string;
  image?: string;
  photo?: string;
  createdAt?: string;
  user?: AppUser;
  createdBy?: AppUser;
  comments?: Comment[];
  commentsCount?: number;
  likes?: unknown[];
  likesCount?: number;
  shares?: unknown[];
  sharesCount?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  originalPost?: Post;
};

export type Notify = {
  _id: string;
  type?: string;
  message?: string;
  text?: string;
  isRead?: boolean;
  read?: boolean;
  createdAt?: string;
  actor?: AppUser;
  user?: AppUser;
};

export type ApiResponse<T> = {
  success?: boolean;
  message?: string;
  errors?: string | string[];
  data?: T;
  meta?: { totalPages?: number; total?: number; unreadCount?: number };
};
