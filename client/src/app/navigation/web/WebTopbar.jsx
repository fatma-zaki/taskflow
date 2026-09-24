import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/shared/components';
import { NotificationsMenu } from '@/features/activity';
import { ROUTES, routeTo } from '../routes.js';
import WebAccountMenu from './WebAccountMenu.jsx';

/**
 * The web app's top bar: global task search, the primary create action, and
 * the two menus.
 */
export default function WebTopbar() {
  const navigate = useNavigate();
  const [term, setTerm] = useState('');

  /** @param {import('react').FormEvent} event */
  const submitSearch = (event) => {
    event.preventDefault();
    navigate(term.trim() ? routeTo.tasksSearch(term.trim()) : ROUTES.tasks);
  };

  return (
    <header className="sticky top-0 z-30 flex h-topbar items-center gap-4 border-b border-line bg-surface/95 px-page backdrop-blur">
      <form onSubmit={submitSearch} className="max-w-md flex-1" role="search">
        <div className="flex h-10 items-center gap-2.5 rounded-md border border-line bg-surface-muted px-3.5 transition-colors duration-fast focus-within:border-primary focus-within:bg-surface">
          <Search size={17} className="shrink-0 text-ink-faint" />
          <input
            type="search"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            placeholder="Search tasks…"
            aria-label="Search tasks"
            className="w-full bg-transparent text-bodysm text-ink placeholder:text-ink-faint focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
        </div>
      </form>

      <div className="ml-auto flex items-center gap-2">
        <Button
          to={ROUTES.taskNew}
          size="md"
          leadingIcon={<Plus size={17} strokeWidth={2.5} />}
        >
          New task
        </Button>
        <NotificationsMenu />
        <WebAccountMenu />
      </div>
    </header>
  );
}
