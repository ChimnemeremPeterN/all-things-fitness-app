export type FeedMode = 'following' | 'for-you';

export type FeedComment = {
  id: string;
  username: string;
  message: string;
  timeAgo: string;
  likes: number;
};

export type FeedVideo = {
  id: string;
  videoUrl: string;
  creator: {
    username: string;
    displayName: string;
    initials: string;
    verified?: boolean;
    accent: string;
  };
  caption: string;
  hashtags: string[];
  categories: string[];
  likes: number;
  comments: FeedComment[];
  shares: number;
  isFollowing: boolean;
};
