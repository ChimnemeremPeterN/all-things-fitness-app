import { Alert, Platform } from 'react-native';
import * as Calendar from 'expo-calendar';
import type { FitnessEvent } from '@/types';

export async function addFitnessEventToCalendar(event: FitnessEvent) {
  if (Platform.OS === 'web') { Alert.alert('Calendar demo', 'Device calendar integration is available on Android and iOS builds.'); return; }
  const permission = await Calendar.requestCalendarPermissions(false);
  if (!permission.granted) { Alert.alert('Calendar permission needed', 'Allow calendar access to add this event.'); return; }
  const calendars = await Calendar.getCalendars(Calendar.EntityTypes.EVENT);
  const writable = calendars.find((calendar) => calendar.allowsModifications) ?? calendars[0];
  if (!writable) { Alert.alert('No writable calendar', 'Add a calendar account on your device and try again.'); return; }
  const startsAt = new Date(event.startsAt); const endsAt = new Date(startsAt.getTime() + event.durationMinutes * 60_000);
  await writable.createEvent({ title: event.name, startDate: startsAt, endDate: endsAt, location: event.location, notes: `${event.description}\nAdded from All Things Fitness.` });
  Alert.alert('Added to calendar', `${event.name} is now on your device calendar.`);
}
