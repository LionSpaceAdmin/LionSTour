import { start } from '@genkit-ai/flow';
import { tripPlannerFlow } from './trip-planner';

start({
  flows: [tripPlannerFlow],
});
