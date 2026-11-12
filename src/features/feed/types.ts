export type FeedPost = {
  id: string;
  author: string;
  handle: string;
  initials: string;
  avatarColor: string;
  time: string;
  location?: string;
  body: string;
  imageLabel?: string;
  imageColor?: string;
  likes: number;
  comments: number;
  likedByMe?: boolean;
  savedByMe?: boolean;
};
