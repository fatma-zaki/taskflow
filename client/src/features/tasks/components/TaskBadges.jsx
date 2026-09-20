import { Badge } from '@/shared/components';
import { PRIORITY_META, STATUS_META } from '../constants/taskMeta.js';

/**
 * @param {Object} props
 * @param {import('@/shared/types').TaskStatus} props.status
 */
export function StatusBadge({ status }) {
  const meta = STATUS_META[status];
  const Icon = meta.icon;
  return (
    <Badge tone={meta.tone} icon={<Icon size={13} strokeWidth={2.5} />}>
      {meta.label}
    </Badge>
  );
}

/**
 * @param {Object} props
 * @param {import('@/shared/types').TaskPriority} props.priority
 */
export function PriorityBadge({ priority }) {
  const meta = PRIORITY_META[priority];
  return <Badge tone={meta.tone}>{meta.label} priority</Badge>;
}
