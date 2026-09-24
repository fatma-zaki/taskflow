import { cn } from '@/shared/utils/cn.js';
import Skeleton from '../Skeleton.jsx';

/**
 * @template Row
 * @typedef {Object} Column
 * @property {string} id
 * @property {string} [header]
 * @property {(row: Row) => import('react').ReactNode} render
 * @property {'left' | 'right' | 'center'} [align]
 * @property {string} [width] Tailwind width class, e.g. 'w-12'.
 */

/**
 * The web app's table. Columns are data, so a page describes what to show and
 * never hand-writes `<thead>`/`<tbody>` markup.
 *
 * @template Row
 * @param {Object} props
 * @param {Column<Row>[]} props.columns
 * @param {Row[]} props.rows
 * @param {(row: Row) => string} props.rowKey
 * @param {boolean} [props.isLoading]
 * @param {number} [props.skeletonRows]
 * @param {import('react').ReactNode} [props.empty] Shown when there are no rows.
 * @param {string} [props.className]
 */
export default function DataTable({
  columns,
  rows,
  rowKey,
  isLoading = false,
  skeletonRows = 5,
  empty,
  className,
}) {
  const alignment = { left: 'text-left', right: 'text-right', center: 'text-center' };

  if (!isLoading && rows.length === 0 && empty) {
    return <div className="px-5 py-12">{empty}</div>;
  }

  return (
    <div className={cn('overflow-x-auto', className)} data-scroll-area>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-line bg-surface-muted">
            {columns.map((column) => (
              <th
                key={column.id}
                scope="col"
                className={cn(
                  'px-5 py-3 text-micro font-bold uppercase tracking-wide text-ink-muted',
                  alignment[column.align ?? 'left'],
                  column.width,
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {isLoading
            ? Array.from({ length: skeletonRows }).map((_, rowIndex) => (
                // eslint-disable-next-line react/no-array-index-key -- placeholders have no identity
                <tr key={rowIndex} className="border-b border-line last:border-0">
                  {columns.map((column) => (
                    <td key={column.id} className="px-5 py-4">
                      <Skeleton className="h-3.5 w-24" />
                    </td>
                  ))}
                </tr>
              ))
            : rows.map((row) => (
                <tr
                  key={rowKey(row)}
                  className="border-b border-line transition-colors duration-fast last:border-0 hover:bg-surface-muted/60"
                >
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      className={cn('px-5 py-4 align-middle', alignment[column.align ?? 'left'])}
                    >
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
