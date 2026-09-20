import { StatTile } from '@/shared/components';

/**
 * The three headline numbers, as compact tiles rather than full-width cards.
 *
 * @param {Object} props
 * @param {import('../services/dashboardStats.js').DashboardStat[]} props.stats
 * @param {string} [props.className]
 */
export default function StatsOverview({ stats, className }) {
  return (
    <div className={className}>
      <div className="flex gap-2.5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <StatTile
              key={stat.id}
              label={stat.label}
              value={stat.value}
              tone={stat.tone}
              icon={<Icon />}
              to={stat.to}
              highlighted={stat.id === 'due-today' && stat.value > 0}
            />
          );
        })}
      </div>
    </div>
  );
}
