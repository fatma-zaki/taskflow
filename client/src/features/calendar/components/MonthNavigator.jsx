import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IconButton } from '@/shared/components';
import { formatMonthYear } from '@/shared/utils/date.js';

/**
 * @param {Object} props
 * @param {Date} props.month
 * @param {(delta: number) => void} props.onShift
 */
export default function MonthNavigator({ month, onShift }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-section">{formatMonthYear(month)}</h2>
      <div className="flex items-center">
        <IconButton label="Previous month" onClick={() => onShift(-1)}>
          <ChevronLeft size={20} />
        </IconButton>
        <IconButton label="Next month" onClick={() => onShift(1)}>
          <ChevronRight size={20} />
        </IconButton>
      </div>
    </div>
  );
}
