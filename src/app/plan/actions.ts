'use server';

import { planTrip, type PlanTripInput } from '@/ai/flows/concierge-service';

export async function planTripAction(input: PlanTripInput) {
  try {
    const output = await planTrip(input);
    return output;
  } catch (e: any) {
    console.error(e);
    // Optionally, you can re-throw the error or return a specific error structure
    throw new Error(`Failed to plan trip: ${e.message}`);
  }
}
