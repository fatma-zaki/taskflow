import { useEffect, useState } from 'react';
import BrandLogo from './BrandLogo.jsx';

const PHRASES = Object.freeze([
  'Great things are taking shape.',
  'Turning ambition into action.',
  'Every big win starts with one task.',
  'Focus. Finish. Flourish.',
  'Your best work is on its way.',
  'Bringing order to brilliance.',
  'Momentum is building.',
]);

/** Each word lands this long after the one before it. */
const WORD_STAGGER_MS = 130;
/** How long a phrase stays on screen before the next one bounces in. */
const PHRASE_MS = 2600;

/**
 * Full-page loader: the logo, then short phrases whose words bounce in one by one.
 * Starts on a random phrase so a quick reload doesn't show the same line every time.
 */
export default function LoadingScreen() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * PHRASES.length));

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % PHRASES.length), PHRASE_MS);
    return () => window.clearInterval(timer);
  }, []);

  const words = PHRASES[index].split(' ');

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen flex-col items-center justify-center gap-8 bg-app px-screen text-center"
    >
      <BrandLogo size="lg" className="animate-check-pop" />

      {/* key forces a remount, so every new phrase replays its entrance */}
      <p key={index} className="flex max-w-md flex-wrap justify-center gap-x-2.5 gap-y-1 text-title font-extrabold desktop:text-display tracking-tight text-ink">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block animate-word-bounce"
            style={{ animationDelay: `${i * WORD_STAGGER_MS}ms` }}
          >
            {word}
          </span>
        ))}
      </p>

      <span aria-hidden="true" className="flex gap-2">
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className="h-2.5 w-2.5 rounded-full bg-primary animate-dot-bounce"
            style={{ animationDelay: `${dot * 160}ms` }}
          />
        ))}
      </span>
    </div>
  );
}
