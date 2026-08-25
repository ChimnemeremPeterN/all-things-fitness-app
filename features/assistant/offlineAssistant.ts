import type { FoodEntry } from '@/types';
import { calculateNutrition, nutritionGoals } from '@/features/nutrition/nutrition';

export const assistantPrompts = ['Meal idea', 'Quick workout', 'Plan my week', 'Explain protein', 'Review today'];

export function createAssistantReply(prompt: string, entries: FoodEntry[]) {
  const lower = prompt.toLowerCase(); const totals = calculateNutrition(entries); const proteinRemaining = Math.max(0, nutritionGoals.protein - totals.protein); const calorieRemaining = Math.max(0, nutritionGoals.calories - totals.calories);
  if (/(pain|injury|diagnos|medicine|medication|doctor|pregnan|disease)/.test(lower)) return 'I can offer general fitness education, but I can’t diagnose symptoms or provide medical treatment. For pain, injury, pregnancy, medication, or health-condition guidance, talk with a qualified clinician who knows your history.';
  if (/(meal|recipe|eat|dinner|lunch|breakfast)/.test(lower)) return `You have about ${calorieRemaining} calories and ${proteinRemaining}g protein remaining in this demo day. Try a Mediterranean chicken bowl with grains, crunchy vegetables and yogurt sauce—or choose the lentil salad for a plant-based option. Adjust portions to your needs.`;
  if (/(workout|train|exercise|gym|strength)/.test(lower)) return 'Try this 24-minute full-body session: 4 rounds of 8 squats, 8 push-ups at your level, 10 hip hinges, 8 rows per side and a 30-second carry or plank. Rest 60–90 seconds between rounds. Stop if you feel sharp pain.';
  if (/(week|plan|schedule|goal)/.test(lower)) return 'A sustainable demo week: Monday full-body strength, Tuesday easy walk or run, Wednesday mobility, Thursday strength, Friday recovery, Saturday community activity and Sunday rest. Keep one flexible day so the plan survives real life.';
  if (/(protein|macro|nutrition)/.test(lower)) return 'Protein supports tissue repair and adaptation. Instead of chasing one perfect number, spread protein-rich foods across meals. Your demo target is 160g; today’s log currently shows ' + totals.protein + 'g.';
  if (/(review|progress|today|analysis)/.test(lower)) return `Today’s demo log shows ${totals.calories} calories, ${totals.protein}g protein, ${totals.carbs}g carbs and ${totals.fat}g fat. The clearest next step is ${proteinRemaining > 25 ? 'a protein-forward meal or snack' : 'hydration and a balanced final meal'}. This is coaching context, not a medical assessment.`;
  return 'I can help with meal ideas, workout structure, fitness education, goal planning and demo progress analysis. Tell me what you’re working toward and what time or equipment you have.';
}
