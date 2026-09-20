import { useEffect, useState } from 'react';
import { colors, motion } from '@/shared/theme/tokens.js';
import { cn } from '@/shared/utils/cn.js';

/**
 * A thin circular progress indicator that animates from 0 on mount.
 *
 * @param {Object} props
 * @param {number} props.value Completed units.
 * @param {number} props.total Total units; a total of 0 renders an empty ring.
 * @param {number} [props.size] Outer diameter in px.
 * @param {number} [props.thickness] Stroke width in px.
 * @param {import('react').ReactNode} [props.children] Centered content.
 * @param {string} [props.className]
 */
export default function ProgressRing({
  value,
  total,
  size = 128,
  thickness = 8,
  children,
  className,
}) {
  const ratio = total > 0 ? Math.min(1, Math.max(0, value / total)) : 0;
  const [drawn, setDrawn] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setDrawn(ratio));
    return () => cancelAnimationFrame(frame);
  }, [ratio]);

  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${value} of ${total} completed`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.primary.soft}
          strokeWidth={thickness}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.primary.DEFAULT}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - drawn)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: `stroke-dashoffset ${motion.slow * 2}ms ${motion.easeOut}` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>
    </div>
  );
}
