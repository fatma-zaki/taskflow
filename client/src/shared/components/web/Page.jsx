import { cn } from '@/shared/utils/cn.js';

/**
 * The web app's page container: centred content column with page padding.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 * @param {'default' | 'narrow'} [props.width]
 * @param {string} [props.className]
 */
export default function Page({ children, width = 'default', className }) {
  return (
    <div className="animate-screen-in px-page py-8">
      <div className={cn('mx-auto w-full', width === 'narrow' ? 'max-w-3xl' : 'max-w-content', className)}>
        {children}
      </div>
    </div>
  );
}
