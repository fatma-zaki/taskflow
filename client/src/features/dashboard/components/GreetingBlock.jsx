import { greetingFor } from '../services/greeting.js';

/**
 * "Good morning, Admin 👋" plus the one-line orientation under it.
 *
 * @param {Object} props
 * @param {string} props.name
 */
export default function GreetingBlock({ name }) {
  return (
    <div className="pt-1">
      <h1 className="text-display">
        {greetingFor()},
        <br />
        {name} <span aria-hidden="true">👋</span>
      </h1>
      <p className="mt-2 text-sub text-ink-muted">
        Here&apos;s what&apos;s happening with your tasks today.
      </p>
    </div>
  );
}
