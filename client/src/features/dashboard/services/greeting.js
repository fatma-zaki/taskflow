/**
 * Time-of-day greeting used on Home.
 *
 * @param {Date} [now]
 * @returns {string} "Good morning" | "Good afternoon" | "Good evening"
 */
export function greetingFor(now = new Date()) {
  const hour = now.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

/** Short encouragements shown under the greeting, chosen by the day of the month. */
const MOTIVATIONS = [
  { title: 'Small steps', description: 'make big progress.' },
  { title: 'One task at a time', description: 'is how days get finished.' },
  { title: 'Start with the hard one', description: 'the rest gets easier.' },
];

/**
 * Deterministic per day, so the message is stable while the app is open but
 * still changes over time.
 *
 * @param {Date} [now]
 * @returns {{ title: string, description: string }}
 */
export function motivationFor(now = new Date()) {
  return MOTIVATIONS[now.getDate() % MOTIVATIONS.length];
}
