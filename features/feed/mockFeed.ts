import type { FeedVideo } from '@/types';

const comments = {
  strength: [
    { id: 'c1', username: 'liftwithmaya', message: 'That final set is where the growth happens 🔥', timeAgo: '2m', likes: 84 },
    { id: 'c2', username: 'coreclub', message: 'Saving this for tomorrow morning.', timeAgo: '8m', likes: 31 },
    { id: 'c3', username: 'jaymoves', message: 'Form cues are so clear. More of this!', timeAgo: '19m', likes: 16 },
  ],
  mobility: [
    { id: 'c4', username: 'runwild', message: 'My hips needed this today.', timeAgo: '4m', likes: 52 },
    { id: 'c5', username: 'sam.fit', message: 'Five minutes and I already feel better.', timeAgo: '21m', likes: 13 },
  ],
};

export const forYouVideos: FeedVideo[] = [
  {
    id: 'full-body-20', videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
    creator: { username: 'fitwithalex', displayName: 'Alex Rivera', initials: 'AR', verified: true, accent: '#F5D90A' },
    caption: '20-minute full-body session. No equipment, no excuses—just start where you are.',
    hashtags: ['Fitness', 'Workout', 'HomeWorkout'], categories: ['Strength', 'Tutorial'], likes: 24800, comments: comments.strength, shares: 1240, isFollowing: false,
  },
  {
    id: 'mobility-reset', videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    creator: { username: 'move.with.nia', displayName: 'Nia Brooks', initials: 'NB', verified: true, accent: '#A5F3FC' },
    caption: 'Your five-minute hip and lower-back reset after a long day at a desk.',
    hashtags: ['Mobility', 'Recovery', 'MoveBetter'], categories: ['Mobility', 'Recovery'], likes: 16300, comments: comments.mobility, shares: 904, isFollowing: true,
  },
  {
    id: 'protein-breakfast', videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    creator: { username: 'fuelledbyjo', displayName: 'Jo Ellis', initials: 'JE', accent: '#FDBA74' },
    caption: 'A quick high-protein breakfast that actually keeps you full through training.',
    hashtags: ['Nutrition', 'HighProtein', 'Recipe'], categories: ['Nutrition', 'Recipes'], likes: 9800, comments: comments.strength.slice(1), shares: 633, isFollowing: false,
  },
  {
    id: 'run-form', videoUrl: 'https://media.w3.org/2010/05/bunny/trailer.mp4',
    creator: { username: 'mileswithmarco', displayName: 'Marco Lee', initials: 'ML', verified: true, accent: '#86EFAC' },
    caption: 'Three simple posture cues for smoother, more efficient miles.',
    hashtags: ['Running', 'FormTips', 'Cardio'], categories: ['Running', 'Education'], likes: 32100, comments: comments.mobility, shares: 2100, isFollowing: true,
  },
];

export const followingVideos = forYouVideos.filter((video) => video.isFollowing);
