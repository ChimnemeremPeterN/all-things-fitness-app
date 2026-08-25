import type { Club, DemoNotification, FitnessEvent, FoodEntry, Recipe } from '@/types';

export const starterFoods: FoodEntry[] = [
  { id: 'food-1', name: 'Greek yogurt bowl', meal: 'Breakfast', calories: 380, protein: 32, carbs: 44, fat: 9, createdAt: new Date().toISOString() },
  { id: 'food-2', name: 'Chicken grain bowl', meal: 'Lunch', calories: 610, protein: 48, carbs: 67, fat: 18, createdAt: new Date().toISOString() },
];

export const recipes: Recipe[] = [
  { id: 'med-chicken', name: 'Mediterranean Chicken Bowl', creator: '@fuelledbyjo', country: 'Greece', cuisine: 'Mediterranean', meal: 'Dinner', dietary: ['High Protein'], calories: 560, protein: 49, carbs: 58, fat: 16, prepMinutes: 25, servings: 2, accent: '#86EFAC', rating: 4.8, ratings: 326, description: 'Bright herbs, seasoned chicken and a creamy yogurt finish.', ingredients: ['300g chicken breast', '1 cup cooked farro', 'Cherry tomatoes', 'Cucumber', 'Greek yogurt', 'Lemon and herbs'], instructions: ['Season and cook the chicken until done.', 'Chop the vegetables and warm the farro.', 'Build bowls and finish with lemon yogurt.'] },
  { id: 'miso-salmon', name: 'Miso Salmon Power Plate', creator: '@mileswithmarco', country: 'Japan', cuisine: 'Japanese', meal: 'Dinner', dietary: ['High Protein', 'Gluten-free'], calories: 620, protein: 44, carbs: 63, fat: 22, prepMinutes: 30, servings: 2, accent: '#FDBA74', rating: 4.9, ratings: 518, description: 'Caramelized miso salmon with rice and crisp greens.', ingredients: ['2 salmon fillets', '2 tbsp miso', '1 cup cooked rice', 'Bok choy', 'Sesame seeds'], instructions: ['Mix miso with a splash of water.', 'Glaze and roast salmon for 12–15 minutes.', 'Serve over rice with sautéed greens.'] },
  { id: 'green-lentil', name: 'Green Lentil Crunch Salad', creator: '@move.with.nia', country: 'Lebanon', cuisine: 'Middle Eastern', meal: 'Lunch', dietary: ['Vegan', 'Vegetarian', 'High Protein'], calories: 430, protein: 24, carbs: 61, fat: 11, prepMinutes: 18, servings: 3, accent: '#A5F3FC', rating: 4.7, ratings: 204, description: 'Plant-powered protein with herbs, lemon and real crunch.', ingredients: ['2 cups lentils', 'Parsley', 'Cucumber', 'Red onion', 'Pumpkin seeds', 'Lemon'], instructions: ['Rinse and drain the lentils.', 'Finely chop vegetables and herbs.', 'Toss everything with lemon and olive oil.'] },
  { id: 'banana-oats', name: 'Banana Protein Oats', creator: '@fitwithalex', country: 'United States', cuisine: 'Modern', meal: 'Breakfast', dietary: ['Vegetarian', 'High Protein'], calories: 410, protein: 31, carbs: 55, fat: 9, prepMinutes: 8, servings: 1, accent: '#F5D90A', rating: 4.6, ratings: 711, description: 'Creamy oats made for quick mornings and strong sessions.', ingredients: ['½ cup oats', '1 banana', '1 scoop protein', 'Milk of choice', 'Cinnamon'], instructions: ['Cook oats with milk.', 'Stir in mashed banana and protein off heat.', 'Top with cinnamon.'] },
];

export const clubs: Club[] = [
  { id: 'sunrise-run', name: 'Sunrise Run Collective', type: 'Running club', location: 'Griffith Park', distanceKm: 2.4, members: 1840, accent: '#F5D90A', description: 'All-paces social runs, trail mornings and weekend coffee.', services: ['Weekly runs', 'Beginner groups', 'Race training'] },
  { id: 'iron-house', name: 'Iron House Strength', type: 'Strength gym', location: 'Downtown', distanceKm: 4.8, members: 962, accent: '#FF8A65', description: 'Community-focused strength training without intimidation.', services: ['Open gym', 'Coaching', 'Powerlifting'] },
  { id: 'flow-state', name: 'Flow State Yoga', type: 'Yoga community', location: 'Silver Lake', distanceKm: 6.1, members: 1310, accent: '#A5F3FC', description: 'Accessible movement, breath work and outdoor flow sessions.', services: ['Vinyasa', 'Mobility', 'Meditation'] },
];

const future = (days: number, hour: number) => { const date = new Date(); date.setDate(date.getDate() + days); date.setHours(hour, 0, 0, 0); return date.toISOString(); };
export const events: FitnessEvent[] = [
  { id: 'park-5k', name: 'Saturday Social 5K', type: 'Run', clubId: 'sunrise-run', location: 'Griffith Park · North Trail', startsAt: future(3, 8), durationMinutes: 75, attendees: 146, accent: '#F5D90A', description: 'A conversational all-paces 5K followed by coffee.' },
  { id: 'deadlift-lab', name: 'Deadlift Technique Lab', type: 'Workshop', clubId: 'iron-house', location: 'Iron House Strength', startsAt: future(5, 18), durationMinutes: 90, attendees: 28, accent: '#FF8A65', description: 'Hands-on coaching for a stronger, safer pull.' },
  { id: 'sunset-flow', name: 'Sunset Mobility Flow', type: 'Class', clubId: 'flow-state', location: 'Silver Lake Meadow', startsAt: future(7, 17), durationMinutes: 60, attendees: 73, accent: '#A5F3FC', description: 'Outdoor recovery flow for every experience level.' },
];

export const starterNotifications: DemoNotification[] = [
  { id: 'n1', title: 'Your protein goal is close', body: 'You’re 36g away from today’s target.', type: 'nutrition', time: '12m', read: false },
  { id: 'n2', title: 'Saturday Social 5K', body: 'The event starts in three days.', type: 'event', time: '1h', read: false },
  { id: 'n3', title: 'move.with.nia posted', body: 'A new five-minute mobility reset is live.', type: 'social', time: '3h', read: true },
];
